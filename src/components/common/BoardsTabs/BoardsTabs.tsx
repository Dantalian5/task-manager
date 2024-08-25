'use client';
import React from 'react';

import { Tabs, Tab } from '@nextui-org/tabs';
import { Spinner } from '@nextui-org/spinner';

import { useBoards } from '@/context/BoardsProvider';
import { svgBoard } from '@/utils/svgIcons';

export default function BoardsTabs() {
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
  return (
    <Tabs
      selectedKey={selectedBoardId?.toString()}
      aria-label="Boards"
      isVertical
      onSelectionChange={handleSelectionChange}
      fullWidth
      variant="light"
      color="primary"
      classNames={{
        tabList: 'gap-4 w-full relative rounded-none pl-0 py-4 pr-4',
        cursor: 'w-full rounded-l-none rounded-r-full',
        tab: 'h-12 justify-start',
        tabContent: 'w-full overflow-hidden font-semibold text-base',
      }}
    >
      {boards?.map((board) => (
        <Tab
          key={board.id}
          id={String(board.id)}
          title={
            <div className="flex items-center overflow-hidden text-base gap-2">
              <span className="text-base">{svgBoard}</span>
              <span className="overflow-hidden overflow-ellipsis">
                {board.title}
              </span>
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
