import React from 'react';

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

interface ColumnProps {
  name: string;
  number: number;
  children?: React.ReactNode;
}
export default function Column({ name, number, children }: ColumnProps) {
  return (
    <div className="min-w-[280px] snap-start snap-always">
      <h2 className="text-xs font-bold uppercase tracking-[2.4px] mb-6">
        {name} ({number})
      </h2>
      <div className="flex flex-col w-full gap-y-5">{children}</div>
    </div>
  );
}
