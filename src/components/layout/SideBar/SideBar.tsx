'use client';

import { useDisclosure } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Spinner } from '@nextui-org/spinner';

import AddBoard from '@/components/common/AddBoard';
import { useBoards } from '@/context/BoardsProvider';
import { svgAddBoard, svgBoard } from '@/utils/svgIcons';

import {
  Sidebar,
  SidebarBody,
  SidebarActions,
} from '@/components/common/Sidebar';

export default function SideBar() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { boards, selectedBoardId, changeSelectedBoard, isLoading } =
    useBoards();
  const handleSelectionChange = (key: React.Key) => {
    if (Number(key) !== Number(selectedBoardId))
      changeSelectedBoard(Number(key));
  };
  return (
    <Sidebar>
      <SidebarBody>
        {isLoading ? (
          <div className="w-full p-4 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
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
        )}
      </SidebarBody>
      <SidebarActions>
        <button
          className="w-full flex items-center justify-start p-3 gap-2 text-base font-semibold text-primary"
          onClick={() => onOpen()}
        >
          {svgAddBoard} + Create New Board
        </button>
        <AddBoard
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      </SidebarActions>
    </Sidebar>
  );
}
