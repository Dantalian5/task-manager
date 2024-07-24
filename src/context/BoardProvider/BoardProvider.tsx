'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Board, Task, UpdatedTask } from '@/types/global';

interface BoardContextProps {
  boards: Board[];
  columns: string[];
  tasks: Task[];
  selectedBoard: Board | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  updateTask: (updatedTask: UpdatedTask) => void;
}
export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardRes = await fetch('/api/boards');
        const boards = await boardRes.json();
        const selectedBoard = boards[0];

        setBoards(boards);
        setSelectedBoard(selectedBoard);
        setColumns(selectedBoard.columns);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoards();
  }, []);
  useEffect(() => {
    if (selectedBoard !== null) {
      const fetchBoards = async () => {
        try {
          const taskRes = await fetch(`/api/boards/${selectedBoard.id}/tasks`);
          const tasks = await taskRes.json();
          setTasks(tasks);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
      fetchBoards();
    }
  }, [selectedBoard]);

  const updateTask = async (updatedTask: UpdatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        selectedBoard,
        setSelectedBoard,
        boards,
        columns,
        tasks,
        updateTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
export default BoardProvider;

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
