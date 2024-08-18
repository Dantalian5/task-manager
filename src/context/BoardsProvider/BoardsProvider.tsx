'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';

import type { Board, Column } from '@/types/global';

interface BoardsContextProps {
  boards: Omit<Board, 'columns'>[];
  isLoading: boolean;
  error: any;
  reload: () => void;
  selectedBoardId: number | null;
  changeSelectedBoard: (boardId: number | null) => void;
  setSelectedBoardId: (boardId: number | null) => void;
}
interface SelectedBoardContextProps {
  board: Board;
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

//const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

export const BoardsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: boards, error, isLoading } = useSWR(`/api/boards`, fetcher);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  const reload = async () => {
    await mutate(`/api/boards`);
  };
  const changeSelectedBoard = async (boardId: number | null) => {
    await reload();
    setSelectedBoardId(boardId);
  };
  useEffect(() => {
    if (boards && boards.length > 0 && selectedBoardId === null) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  if (error) {
    return (
      <div className="w-full max-w-[80%] mx-auto h-full flex-grow flex flex-col items-center justify-center gap-4">
        <h2 className="text-4xl text-center font-semibold">Oops!</h2>
        <p className="text-xl text-center">
          We’re having trouble connecting to the server.
        </p>
        <Divider />
        <p className="text-base text-secondary">
          Please try again, or reach out to our{' '}
          <a
            className="text-center text-primary underline"
            href="https://valenzuela.dev"
          >
            development team
          </a>{' '}
          for assistance .
        </p>
        <Button color="primary" size="lg" onClick={reload}>
          Try again
        </Button>
      </div>
    );
  }
  return (
    <BoardsContext.Provider
      value={{
        boards,
        reload,
        isLoading,
        error,
        selectedBoardId,
        changeSelectedBoard,
        setSelectedBoardId,
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
