import React from 'react';

import TaskCard from '@/components/common/TaskCard';
import { TaskProvider } from '@/context/TaskProvider';

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
  column: string;
  tasks: Task[];
}
export default function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="min-w-[280px] snap-start snap-always">
      <h2 className="text-xs font-bold uppercase tracking-[2.4px] mb-6">
        {column} ({tasks.length})
      </h2>
      <div className="flex flex-col w-full gap-y-5">
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskProvider initialTask={task}>
              <TaskCard />
            </TaskProvider>
          </div>
        ))}
      </div>
    </div>
  );
}
