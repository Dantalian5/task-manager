'use client';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

import Column from '@/components/layout/Column';
import TaskCard from '@/components/common/TaskCard';
import TaskEdit from '@/components/common/TaskEdit';
import BoardEdit from '@/components/common/BoardEdit';

import { useBoard } from '@/context/BoardProvider/BoardProvider';
import TaskProvider from '@/context/TaskProvider';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';

const svgPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"
    ></path>
  </svg>
);

export default function Board() {
  const { tasks, selectedBoard } = useBoard();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
    <main className="bg-slate-100 min-h-svh flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6">
      {selectedBoard?.columns.map((column) => (
        <Column
          key={column}
          name={column}
          number={
            tasks.filter(
              (task) => task.status.toLowerCase() === column.toLowerCase()
            ).length
          }
        >
          {tasks
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
        </Column>
      ))}
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
