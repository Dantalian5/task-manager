'use client';
import React from 'react';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';

import TaskEdit from '@/components/common/TaskEdit';
import EditBoard from '@/components/common/EditBoard';
import { useSelectedBoard } from '@/context/BoardsProvider';
import { svgEditBoard, svgPlus } from '@/utils/svgIcons';

export default function Topbar() {
  const { board, isLoading } = useSelectedBoard();
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

  if (isLoading || !board) {
    return null;
  }

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {board?.title}
      </h2>
      <div className="flex items-center justify-center gap-1 sm:gap-3">
        {board?.columns.length > 0 && (
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
        )}
        <Tooltip content="Edit current board">
          <Button
            isIconOnly
            size="lg"
            color="success"
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
    </>
  );
}
