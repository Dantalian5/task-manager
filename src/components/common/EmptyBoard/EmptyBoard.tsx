import React from 'react';

import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

import AddBoard from '@/components/forms/AddBoard';
import AddColumn from '@/components/forms/AddColumn';
import { svgAddBoard, svgAddColumn } from '@/utils/svgIcons';

interface EmptyBoardProps {
  variant: 'board' | 'column';
}
export default function EmptyBoard({ variant }: EmptyBoardProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow gap-6 ">
      {variant === 'board' && (
        <>
          <p className="text-lg max-w-[80%] text-center text-secondary font-semibold">
            Your dashboard is empty, create a new board to get started.
          </p>
          <Button
            color="primary"
            size="lg"
            startContent={svgAddBoard}
            onClick={() => onOpen()}
          >
            Create New Board
          </Button>
          <AddBoard
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        </>
      )}
      {variant === 'column' && (
        <>
          <p className="text-lg max-w-[80%] text-center text-secondary font-semibold">
            Your Board is empty, create a new{' '}
            <span className="text-success">Column</span> to add tasks.
          </p>
          <Button
            color="primary"
            size="lg"
            startContent={svgAddColumn}
            onClick={() => onOpen()}
          >
            Add New Column
          </Button>
          <AddColumn
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        </>
      )}
    </div>
  );
}
