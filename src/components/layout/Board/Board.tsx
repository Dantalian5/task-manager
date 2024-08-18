'use client';

import React from 'react';

import TaskCard from '@/components/common/TaskCard';
import { Spinner } from '@nextui-org/spinner';

import { useSelectedBoard } from '@/context/BoardsProvider';
import TaskProvider from '@/context/TaskProvider';
import TopBar from '@/components/layout/TopBar';
import EmptyBoard from '@/components/common/EmptyBoard';

export default function Board() {
  const { board, isLoading } = useSelectedBoard();

  if (isLoading) {
    return (
      <main className="w-full flex flex-col items-center justify-center flex-grow ">
        <Spinner />
      </main>
    );
  }
  if (!board) {
    return <EmptyBoard variant="board" />;
  }
  return (
    <main className="w-full flex flex-col items-stretch flex-grow overflow-scroll">
      <TopBar />
      {board.columns.length > 0 ? (
        <div className=" flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6 w-full h-full flex-grow relative z-10">
          {' '}
          {board.columns.map((column) => (
            <div
              key={column.id}
              className="w-[280px] min-w-[280px] snap-start snap-always"
            >
              <h2 className="text-xs text-foreground/50 font-bold uppercase tracking-[2.4px] mb-6">
                {column.name} ({column.tasks?.length || 0})
              </h2>
              <div className="flex flex-col w-full gap-y-5">
                {column.tasks?.map((task) => (
                  <div key={task.id}>
                    <TaskProvider initialTask={task}>
                      <TaskCard />
                    </TaskProvider>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyBoard variant="column" />
      )}
    </main>
  );
}
