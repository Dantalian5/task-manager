'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface Board {
  id: number;
  title: string;
  columns: string[];
}

interface BoardContextProps {
  boards: Board[];
  selectedBoard: Board | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<Board | null>>;
}
export const BoardContext = createContext<BoardContextProps | undefined>(
  undefined
);

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards');
        const data = await response.json();
        setBoards(data);
        setSelectedBoard(data[0]);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);
  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard, boards }}>
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
