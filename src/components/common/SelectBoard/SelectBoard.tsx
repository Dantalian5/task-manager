'use client';
import React from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { useBoard } from '@/context/BoardProvider/BoardProvider';

export default function SelectBoard() {
  const { boards, selectedBoard, setSelectedBoard } = useBoard();
  const selectedKeys = selectedBoard !== null ? [String(selectedBoard.id)] : [];
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!!e.target.value) {
      setSelectedBoard(
        boards.find((board) => board.id === Number(e.target.value)) || null
      );
    }
  };
  return (
    <Select
      className="w-[50%] mr-auto"
      classNames={{
        value: 'text-base font-bold',
      }}
      selectionMode="single"
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
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
