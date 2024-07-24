'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

import type { Task } from '@/types/global';

interface UpdatedTask {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: {
    id: number | null;
    title: string;
  }[];
}
interface IndividualTaskContextProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  updateSubTask: (subTaskId: number, status: boolean) => void;
}

const TaskContext = createContext<IndividualTaskContextProps | undefined>(
  undefined
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

  const updateSubTask = async (subTaskId: number, status: boolean) => {
    try {
      const response = await fetch(`/api/subtasks/${subTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update subtask');
      }
      const updatedSubTask = await response.json();
      setTask((prevTask) => {
        const updatedSubTasks = prevTask.subTasks.map((subTask) =>
          subTask.id === subTaskId ? updatedSubTask : subTask
        );
        return { ...prevTask, subTasks: updatedSubTasks };
      });
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ task, setTask, updateSubTask }}>
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
