import React, { createContext, useContext } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BoardContext = createContext(null);

const BoardProvider = ({ children, id }) => {
  const {
    data: board,
    error,
    isLoading,
  } = useSWR(id ? `/api/boards/${id}` : null, fetcher);

  const reload = async (id: string) => {
    await mutate(`/api/boards/${id}`);
  };

  return (
    <BoardContext.Provider value={{ board, error, isLoading, reload }}>
      {children}
    </BoardContext.Provider>
  );
};
export default BoardProvider;
export const useBoardContext = () => {
  return useContext(BoardContext);
};
