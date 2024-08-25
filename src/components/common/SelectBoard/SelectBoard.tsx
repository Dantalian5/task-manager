'use client';
import React from 'react';

import { Spinner } from '@nextui-org/spinner';

import { Select, SelectItem } from '@nextui-org/select';
import { useSelectedBoard, useBoards } from '@/context/BoardsProvider';

export default function SelectBoard() {
  const { boards, selectedBoardId, changeSelectedBoard, isLoading } =
    useBoards();

  const handleSelectionChange = (key: React.Key) => {
    if (Number(key) !== Number(selectedBoardId))
      changeSelectedBoard(Number(key));
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // const selectedKeys = selectedBoard !== null ? [String(selectedBoard.id)] : [];
  // const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (!!e.target.value) {
  //     setSelectedBoard(
  //       boards.find((board) => board.id === Number(e.target.value)) || null
  //     );
  //   }
  // };
  return (
    <Select
      className="w-[50%] mr-auto sm:hidden"
      classNames={{
        value: 'text-base font-bold',
      }}
      selectionMode="single"
      selectedKeys={[selectedBoardId?.toString()]}
      variant="underlined"
      aria-label="Select Board"
      onChange={handleSelectionChange}
    >
      {boards.map((board) => (
        <SelectItem key={board.id}>{board.title}</SelectItem>
      ))}
    </Select>
  );
}
