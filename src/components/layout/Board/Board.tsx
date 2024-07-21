'use client';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';

import { useBoard } from '@/context/BoardProvider';

interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
}
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subTasks: SubTask[];
}

export default function Board() {
  const { selectedBoard } = useBoard();
  const { columns } = selectedBoard || { columns: [] };
  const [data, setData] = useState<Task[]>([]);

  const fetchData = async (id: number) => {
    try {
      const response = await fetch(`/api/boards/${selectedBoard?.id}/tasks`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      if (selectedBoard !== null) {
        const tasks = await fetchData(selectedBoard?.id);
        setData(tasks);
      }
    };
    getTasks();
  }, [selectedBoard]);

  console.log(data);
  if (columns.length == 0) {
    return (
      <main className="bg-slate-100 min-h-svh flex justify-center items-center p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-lg font-bold text-center opacity-50">
            This board is empty. Create a new column to get started.
          </p>
          <Button
            size="lg"
            color="primary"
            radius="full"
            className="text-base font-bold"
          >
            + Add New Column
          </Button>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-slate-100 min-h-svh flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4">
      {columns.map((column) => (
        <div
          key={column}
          className="min-w-[280px] border snap-start snap-always"
        >
          <h2 className="text-xs font-bold uppercase tracking-[2.4px] mb-6">
            {column}
          </h2>
          <div className="flex flex-col w-full">
            {data.map((task) => (
              <div key={task.id} className="">
                {task.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
