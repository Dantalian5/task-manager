'use client';

import React, { createContext, useContext } from 'react';

import useSWR from 'swr';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';

import TaskCard from '@/components/common/TaskCard';
import TaskEdit from '@/components/common/TaskEdit';

import { useSelectedBoard } from '@/context/BoardsProvider';
import TaskProvider from '@/context/TaskProvider';
import TopBar from '@/components/layout/TopBar';

import { svgPlus } from '@/utils/svgIcons';

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
interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Board() {
  const { board, isLoading } = useSelectedBoard();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // if (selectedBoard?.columns.length === 0) {
  //   return (
  //     <main className="bg-slate-100 min-h-svh flex justify-center items-center p-4">
  //       <div className="flex flex-col items-center justify-center gap-6">
  //         <p className="text-lg font-bold text-center opacity-50">
  //           This board is empty. Create a new column to get started.
  //         </p>
  //         <Button
  //           size="lg"
  //           color="primary"
  //           radius="full"
  //           className="text-base font-bold"
  //         >
  //           + Add New Column
  //         </Button>
  //       </div>
  //     </main>
  //   );
  // }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!board) {
    return <div>Board not found</div>;
  }
  return (
    <main className="bg-slate-100 w-full flex flex-col items-stretch flex-grow overflow-scroll">
      <TopBar title={board.title} />
      <div className=" flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6 w-full h-full flex-grow">
        {' '}
        {board.columns.map((column: Column) => (
          <div
            key={column.id}
            className="w-[280px] min-w-[280px] snap-start snap-always"
          >
            <h2 className="text-xs text-secondary font-bold uppercase tracking-[2.4px] mb-6">
              {column.name} ({column.tasks?.length || 0})
            </h2>
            <div className="flex flex-col w-full gap-y-5">
              {column.tasks?.map((task) => (
                <div key={task.id}>
                  {/* <TaskProvider initialTask={task}>
                    <TaskCard />
                  </TaskProvider> */}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="w-[280px] min-w-[280px] snap-start snap-always self-stretch flex flex-col gap-6">
          <span className="block text-xs font-bold invisible">
            Add new column
          </span>
          <button className="bg-slate-200 w-full flex items-center justify-center flex-grow rounded-lg font-semibold">
            + Add New Column
          </button>
        </div>
      </div>

      {/* <Dropdown>
        <DropdownTrigger>
          <Button
            className=" fixed bottom-2 right-2 text-xl font-bold"
            color="primary"
            isIconOnly
            radius="full"
            size="lg"
          >
            {svgPlus}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new_task" onPress={onOpen}>
            New Task
          </DropdownItem>
          <DropdownItem key="new_column">New Column</DropdownItem>
          <DropdownItem key="new_board">New Board</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      {/* <TaskEdit
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        action={'add'}
      /> */}
    </main>
  );
}
