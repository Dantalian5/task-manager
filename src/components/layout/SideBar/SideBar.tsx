'use client';

import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Divider } from '@nextui-org/divider';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';
import { Spinner } from '@nextui-org/spinner';

import UserBtn from '@/components/common/UserBtn';
import AddBoard from '@/components/common/AddBoard';
import { useBoards } from '@/context/BoardsProvider';
import { svgAddBoard, svgPlus, svgBoard, svgMenu } from '@/utils/svgIcons';
import { Span } from 'next/dist/trace';
import { svgSun, svgMoon } from '@/utils/svgIcons';

export default function SideBar() {
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { boards, selectedBoardId, changeSelectedBoard, isLoading } =
    useBoards();
  const handleSelectionChange = (key: React.Key) => {
    if (Number(key) !== Number(selectedBoardId))
      changeSelectedBoard(Number(key));
  };
  return (
    <div className="hidden w-full sm:max-w-[260px] lg:max-w-[300px] sm:flex flex-col border-r border-border/10 relative z-2 ">
      <div className="flex w-full items-center p-5 border-b border-border/10 shadow-bottom justify-between bg-gradient-to-br from-background/10 to-background-light/20">
        <UserBtn />
      </div>
      <div className="flex w-full flex-col overflow-hidden flex-grow bg-gradient-to-r from-background/5 to-background-light/20 backdrop-blur-sm shadow-right">
        <div className="overflow-scroll">
          {isLoading ? (
            <div className="w-full p-4 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <ScrollShadow className="w-full h-full">
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
                {boards.map((board) => (
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
            </ScrollShadow>
          )}
        </div>
        <Divider className="w-[80%] mx-auto" />
        <button
          className="w-full flex items-center justify-start p-3 gap-2 text-base font-semibold text-primary"
          onClick={() => onOpen()}
        >
          {svgAddBoard} + Create New Board
        </button>
        <div className="flex p-3 items-center justify-start mt-auto">
          <Switch
            size="md"
            color="success"
            startContent={svgSun}
            endContent={svgMoon}
            aria-label="Switch Color Theme"
            isSelected={(theme === 'light' && true) || false}
            onValueChange={(value) => setTheme(value ? 'light' : 'dark')}
          />
        </div>
        <AddBoard
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
