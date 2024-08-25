'use client';
import React from 'react';

import { Select, SelectItem } from '@nextui-org/select';
import { useSelectedBoard, useBoards } from '@/context/BoardsProvider';

export default function SelectBoard() {
  const { board, isLoading: isSelectedBoardLoading } = useSelectedBoard();
  const { boards, selectedBoardId, changeSelectedBoard, isLoading } =
    useBoards();

  if (isLoading || isSelectedBoardLoading) {
    return null;
  }

  return (
    <h2 className="text-xl sm:text-2xl font-semibold text-foreground w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
      {board?.title}
    </h2>
  );

  // const selectedKeys = selectedBoard !== null ? [String(selectedBoard.id)] : [];
  // const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (!!e.target.value) {
  //     setSelectedBoard(
  //       boards.find((board) => board.id === Number(e.target.value)) || null
  //     );
  //   }
  // };
  // return (
  //   <Select
  //     className="w-[50%] mr-auto sm:hidden"
  //     classNames={{
  //       value: 'text-base font-bold',
  //     }}
  //     selectionMode="single"
  //     defaultSelectedKeys={selectedKeys}
  //     selectedKeys={selectedKeys}
  //     variant="underlined"
  //     aria-label="Select Board"
  //     onChange={handleSelectionChange}
  //   >
  //     {boards.map((board) => (
  //       <SelectItem key={board.id}>{board.title}</SelectItem>
  //     ))}
  //   </Select>
  // );
}
