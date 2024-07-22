'use client';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';

import { useBoard } from '@/context/BoardProvider';
import Column from '@/components/layout/Column';

import { useColumns } from '@/context/ColumnsProvider';

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

const fetchData = async (id: number) => {
  try {
    const response = await fetch(`/api/boards/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};
export default function Board() {
  const { selectedBoard } = useBoard();
  const [data, setData] = useState<Task[]>([]);
  const { columns, setColumns } = useColumns();

  useEffect(() => {
    const getTasks = async () => {
      if (selectedBoard !== null) {
        const tasks = await fetchData(selectedBoard?.id);
        setData(tasks);
      }
    };
    getTasks();
    setColumns(selectedBoard?.columns || []);
  }, [selectedBoard, setColumns]);

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
    <main className="bg-slate-100 min-h-svh flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6">
      {columns.map((column) => (
        <Column
          key={column}
          column={column}
          tasks={data.filter(
            (task) => task.status.toLowerCase() === column.toLowerCase()
          )}
        />
      ))}
    </main>
  );
}
