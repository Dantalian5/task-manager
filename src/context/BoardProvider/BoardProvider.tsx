'use client';
import { createContext, useContext, useState, useEffect } from 'react';
// import type {
//   Board,
//   NewBoard,
//   Task,
//   UpdatedTask,
//   NewTask,
// } from '@/types/global';
import type { NewBoard, UpdatedTask, NewTask } from '@/types/global';

//-------------
interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
}
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
}
type Column = string;

interface Board {
  id: number;
  title: string;
  columns: Column[];
}
interface FullBoard extends Board {
  tasks: Task[];
}
//-------------
interface BoardContextProps {
  boards: Board[];
  selectedBoard: FullBoard;
  columns: string[];
  tasks: Task[];
  setSelectedBoard: React.Dispatch<React.SetStateAction<FullBoard>>;
  changeSelectedBoard: (id: number) => void;
  addBoard: (board: NewBoard) => Promise<void>;
  updateBoard: (board: Board) => Promise<void>;
  addTask: (newTask: NewTask) => Promise<void>;
  updateTask: (updatedTask: UpdatedTask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}
export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

const BoardProvider = ({
  children,
  initialBoards,
  initialSelectedBoard,
}: {
  children: React.ReactNode;
  initialBoards: any;
  initialSelectedBoard: any;
}) => {
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [selectedBoard, setSelectedBoard] =
    useState<FullBoard>(initialSelectedBoard);
  const [columns, setColumns] = useState<Column[]>(
    initialSelectedBoard.columns
  );
  const [tasks, setTasks] = useState<Task[]>(initialSelectedBoard.tasks);

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

  const changeSelectedBoard = async (boardId: number) => {
    const selectedBoard = await fetch(`/api/boards/${boards[0].id}`).then(
      (res) => res.json()
    );
    setSelectedBoard(selectedBoard);
  };

  const addBoard = async (board: NewBoard) => {
    try {
      const response = await fetch(`/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });

      if (!response.ok) {
        throw new Error('Failed to update board');
      }

      const newBoard = await response.json();
      setSelectedBoard(newBoard);
      setBoards((prevBoards) => [...prevBoards, newBoard]);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const updateBoard = async (board: Board) => {
    try {
      const response = await fetch(`/api/boards/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });

      if (!response.ok) {
        throw new Error('Failed to update board');
      }

      const updatedBoard = await response.json();
      setSelectedBoard(updatedBoard);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      );
    } catch (error) {
      console.error('Error updating board:', error);
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
        changeSelectedBoard,
        boards,
        columns,
        tasks,
        addBoard,
        updateBoard,
        addTask,
        updateTask,
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
