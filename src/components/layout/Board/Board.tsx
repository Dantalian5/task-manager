'use client';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

import Column from '@/components/layout/Column';
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
  const { columns, tasks } = selectedBoard;
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
    <main className="bg-slate-100 w-full flex flex-col items-stretch flex-grow">
      <TopBar title={selectedBoard.title} />
      <div className=" flex items-start p-4 overflow-x-scroll snap-x snap-mandatory scroll-px-4 gap-x-6 w-full h-full flex-grow">
        {' '}
        {columns.map((column) => (
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
