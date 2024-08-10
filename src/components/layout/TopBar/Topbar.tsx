import React from 'react';

interface TopBoardProps {
  title: string;
}
export default function Topbar({ title }: TopBoardProps) {
  return (
    <div className="flex w-full items-center p-4 bg-white border-b shadow-md">
      <h2 className="text-2xl font-semibold ">{title}</h2>
    </div>
  );
}
