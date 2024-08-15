'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

import type { Task } from '@/types/global';

interface IndividualTaskContextProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

const TaskContext = createContext<IndividualTaskContextProps>(
  {} as IndividualTaskContextProps
);

export const TaskProvider = ({
  children,
  initialTask,
}: {
  children: React.ReactNode;
  initialTask: Task;
}) => {
  const [task, setTask] = useState<Task>(initialTask);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error(
      'useIndividualTask must be used within an IndividualTaskProvider'
    );
  }
  return context;
};
