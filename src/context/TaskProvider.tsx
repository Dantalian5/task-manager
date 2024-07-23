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
  updateTask: (updatedTask: UpdatedTask) => void;
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
      setTask(data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

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
    <TaskContext.Provider value={{ task, setTask, updateSubTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error(
      'useIndividualTask must be used within an IndividualTaskProvider'
    );
  }
  return context;
};
