'use client';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

import TaskCard from '@/components/common/TaskCard';
import TaskEdit from '@/components/common/TaskEdit';
import BoardEdit from '@/components/common/BoardEdit';

import { useBoard } from '@/context/BoardProvider/BoardProvider';
import TaskProvider from '@/context/TaskProvider';
import TopBar from '@/components/layout/TopBar';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';

import { svgPlus } from '@/utils/svgIcons';

export default function Board() {
  const { selectedBoard } = useBoard();
  // const { columns, tasks } = selectedBoard;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  console.log(selectedBoard);

  if (selectedBoard?.columns.length == 0) {
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
    <main className="bg-slate-100 w-full flex flex-col items-stretch flex-grow overflow-scroll">
      <TopBar title={selectedBoard.title} />
      <div className=" flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6 w-full h-full flex-grow">
        {' '}
        {selectedBoard.columns.map((column) => (
          <div
            key={column}
            className="w-[280px] min-w-[280px] snap-start snap-always"
          >
            <h2 className="text-xs font-bold uppercase tracking-[2.4px] mb-6">
              {column} (
              {
                selectedBoard.tasks.filter(
                  (task) => task.status.toLowerCase() === column.toLowerCase()
                ).length
              }
              )
            </h2>
            <div className="flex flex-col w-full gap-y-5">
              {selectedBoard.tasks
                .filter(
                  (task) => task.status.toLowerCase() === column.toLowerCase()
                )
                .map((task) => (
                  <div key={task.id}>
                    <TaskProvider initialTask={task}>
                      <TaskCard />
                    </TaskProvider>
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

      <Dropdown>
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
      </Dropdown>
      <TaskEdit
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        action={'add'}
      />
    </main>
  );
}
