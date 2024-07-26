'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Board, Task, UpdatedTask, NewTask } from '@/types/global';

interface BoardContextProps {
  boards: Board[];
  columns: string[];
  tasks: Task[];
  selectedBoard: Board | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  addTask: (newTask: NewTask) => Promise<void>;
  updateTask: (updatedTask: UpdatedTask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
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
  const addTask = async (newTask: NewTask) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
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
        addTask,
        deleteTask,
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
