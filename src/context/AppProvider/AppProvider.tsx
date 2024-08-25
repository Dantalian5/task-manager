'use client';
import React, { createContext, useContext, useState, useRef } from 'react';

interface AppContextProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  interactiveRef: React.MutableRefObject<HTMLButtonElement | null>;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const interactiveRef = useRef<HTMLButtonElement>(null);

  return (
    <AppContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, interactiveRef }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
