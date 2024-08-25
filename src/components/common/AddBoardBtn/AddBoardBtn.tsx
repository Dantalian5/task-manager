'use client';
import React from 'react';

import { useDisclosure } from '@nextui-org/react';

import AddBoard from '@/components/forms/AddBoard';
import { svgAddBoard } from '@/utils/svgIcons';

export default function AddBoardBtn() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        className="w-full flex items-center justify-start p-3 gap-2 text-base font-semibold text-primary"
        onClick={() => onOpen()}
      >
        {svgAddBoard} + Create New Board
      </button>
      <AddBoard isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  );
}
