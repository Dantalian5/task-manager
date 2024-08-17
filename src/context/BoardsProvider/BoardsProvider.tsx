'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());
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
