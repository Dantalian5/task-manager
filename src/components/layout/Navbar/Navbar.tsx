'use client';
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';

import SelectBoard from '@/components/common/SelectBoard';
import UserBtn from '@/components/common/UserBtn';
import BoardEdit from '@/components/common/BoardEdit';
import { useBoard } from '@/context/BoardProvider';
import { svgAddBoard, svgPlus, svgBoard, svgMenu } from '@/utils/svgIcons';

export default function Navbar() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { boards, selectedBoardId, changeSelectedBoard } = useBoard();
  const selectedKey = selectedBoardId.toString();
  const handleSelectionChange = (key: React.Key) => {
    changeSelectedBoard(Number(key));
  };

  return (
    <div className="w-full sm:max-w-[260px] lg:max-w-[300px] sm:flex sm:flex-col">
      <Nav isBordered>
        <NavbarContent justify="start" className="flex-initial gap-0">
          <UserBtn />
        </NavbarContent>
        <SelectBoard />
        <NavbarContent justify="end" className="gap-0">
          <Button
            color="primary"
            size="sm"
            variant="solid"
            radius="full"
            className="opacity-25 text-base py-2.5 h-auto px-5 min-w-px"
            onClick={onOpen}
          >
            {svgPlus}
          </Button>
          <Button
            color="default"
            size="sm"
            variant="light"
            className="text-2xl opacity-70"
            isIconOnly
          >
            {svgMenu}
          </Button>
        </NavbarContent>
      </Nav>
      <Tabs
        selectedKey={selectedKey}
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
        }}
      >
        {boards.map((board) => (
          <Tab
            key={board.id}
            id={String(board.id)}
            title={
              <div className="flex items-center space-x-2 text-base">
                {svgBoard}
                <span className="font-semibold">{board.title}</span>
                {/* <Chip size="sm" variant="faded">
                  9
                </Chip> */}
              </div>
            }
          />
        ))}
      </Tabs>
      <Divider className="w-[80%] mx-auto" />
      <button
        className="w-full flex items-center justify-start p-3 gap-2 text-base font-semibold text-primary"
        onClick={() => onOpen()}
      >
        {svgAddBoard} + Create New Board
      </button>
      <BoardEdit
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        action="add"
      />
    </div>
  );
}
