'use client';
import React from 'react';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';

import TaskEdit from '@/components/common/TaskEdit';
import EditBoard from '@/components/common/EditBoard';
import { svgEditBoard, svgPlus } from '@/utils/svgIcons';

interface TopBoardProps {
  title: string;
}
export default function Topbar({ title }: TopBoardProps) {
  const {
    isOpen: isTaskEditOpen,
    onOpen: onTaskEditOpen,
    onOpenChange: onTaskEditOpenChange,
    onClose: onTaskEditClose,
  } = useDisclosure();
  const {
    isOpen: isBoardEditOpen,
    onOpen: onBoardEditOpen,
    onOpenChange: onBoardEditOpenChange,
    onClose: onBoardEditClose,
  } = useDisclosure();
  return (
    <div className="flex w-full items-center px-4 py-3 sm:py-4 bg-background border-x border-b shadow-md justify-between gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-1">
        <Button
          color="primary"
          size="lg"
          variant="solid"
          radius="lg"
          className="text-base font-semibold px-0 sm:px-6 min-w-12"
          onClick={onTaskEditOpen}
          startContent={svgPlus}
        >
          <span className="hidden sm:inline">Add New Task</span>
        </Button>
        <Tooltip content="Edit current board">
          <Button
            isIconOnly
            size="lg"
            color="primary"
            variant="bordered"
            aria-label="Take a photo"
            radius="lg"
            className="text-2xl"
            onClick={onBoardEditOpen}
          >
            {svgEditBoard}
          </Button>
        </Tooltip>
      </div>
      <TaskEdit
        isOpen={isTaskEditOpen}
        onOpenChange={onTaskEditOpenChange}
        onClose={onTaskEditClose}
      />
      <EditBoard
        isOpen={isBoardEditOpen}
        onOpenChange={onBoardEditOpenChange}
        onClose={onBoardEditClose}
        action="edit"
      />
    </div>
  );
}
