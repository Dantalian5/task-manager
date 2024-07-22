'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface ColumnsContextProps {
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ColumnsContext = createContext<ColumnsContextProps | undefined>(
  undefined
);

const ColumnsProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<string[]>([]);
  return (
    <ColumnsContext.Provider value={{ columns, setColumns }}>
      {children}
    </ColumnsContext.Provider>
  );
};
export default ColumnsProvider;

export const useColumns = () => {
  const context = useContext(ColumnsContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
