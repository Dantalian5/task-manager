'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

interface BoardsContextProps {
  boards: Board[];
  isLoading: boolean;
  error: any;
  reload: () => void;
  selectedBoardId: number | null;
  changeSelectedBoard: (boardId: number | null) => void;
}
interface SelectedBoardContextProps {
  board: FullBoard;
  columns: Column[];
  isLoading: boolean;
  error: any;
  reload: () => void;
}

const BoardsContext = createContext<BoardsContextProps>(
  {} as BoardsContextProps
);
const SelectedBoardContext = createContext<SelectedBoardContextProps>(
  {} as SelectedBoardContextProps
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const BoardsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: boards, error, isLoading } = useSWR(`/api/boards`, fetcher);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  const reload = async () => {
    await mutate(`/api/boards`);
  };
  const changeSelectedBoard = async (boardId: number | null) => {
    await reload();
    setSelectedBoardId(boardId ? boardId : boards[0].id);
  };
  useEffect(() => {
    if (boards && boards.length > 0 && selectedBoardId === null) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  return (
    <BoardsContext.Provider
      value={{
        boards,
        reload,
        isLoading,
        error,
        selectedBoardId,
        changeSelectedBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export const SelectedBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { selectedBoardId: id } = useBoards();
  const {
    data: board,
    error,
    isLoading,
  } = useSWR(id ? `/api/boards/${id}` : null, fetcher);
  const columns = board?.columns.map((column: Column) => ({
    id: column.id,
    name: column.name,
  }));

  const reload = async () => {
    await mutate(`/api/boards/${id}`);
  };

  return (
    <SelectedBoardContext.Provider
      value={{ board, columns, error, isLoading, reload }}
    >
      {children}
    </SelectedBoardContext.Provider>
  );
};

export const useBoards = () => useContext(BoardsContext);
export const useSelectedBoard = () => useContext(SelectedBoardContext);

//---------------------------------------------------------------------
interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
}
interface NewTask {
  title: string;
  description: string;
  status: string;
  subTasks: {
    id: number | null;
    title: string;
  }[];
}
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
}
interface Column {
  id: number;
  name: string;
  tasks: Task[];
}
interface Board {
  id: number;
  title: string;
}
interface FullBoard extends Board {
  columns: Column[];
}

// const addTask = async (newTask: NewTask) => {
//   try {
//     const response = await fetch(`/api/tasks`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ...newTask, boardId: selectedBoardId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update task');
//     }

//     const data = await response.json();
//     // setSelectedBoard((prev) => ({
//     //   ...prev,
//     //   tasks: [...prev.tasks, data],
//     // }));
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };
// const updateTask = async (updatedTask: UpdatedTask) => {
//   try {
//     const response = await fetch(`/api/tasks/${updatedTask.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedTask),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update task');
//     }

//     const data = await response.json();
//     // setSelectedBoard((prev) => ({
//     //   ...prev,
//     //   tasks: prev.tasks.map((task) => (task.id === data.id ? data : task)), // Actualizamos la tarea específica
//     // }));
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };

// const deleteTask = async (taskId: number) => {
//   try {
//     const response = await fetch(`/api/tasks/${taskId}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete task');
//     }

//     // setSelectedBoard((prevBoard) => ({
//     //   ...prevBoard,
//     //   tasks: prevBoard.tasks.filter((task) => task.id !== taskId),
//     // }));
//   } catch (error) {
//     console.error('Error deleting task:', error);
//   }
// };
