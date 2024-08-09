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

const svgPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"
    ></path>
  </svg>
);
const svgMenu = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <circle cx={8} cy={2.5} r={0.75}></circle>
      <circle cx={8} cy={8} r={0.75}></circle>
      <circle cx={8} cy={13.5} r={0.75}></circle>
    </g>
  </svg>
);
const svgBoard = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17.28 8.72a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0m0 6.56a.75.75 0 1 0-1.06-1.06l-1.47 1.47l-.47-.47a.75.75 0 1 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zM7 10.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75M7.75 15a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5zm8.236-11a2.25 2.25 0 0 0-2.236-2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4zM10.25 6.5h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1m0-3h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5"
    ></path>
  </svg>
);
const svgAddBoard = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M13.986 4a2.25 2.25 0 0 0-2.236-2h-3.5a2.25 2.25 0 0 0-2.236 2H4.25A2.25 2.25 0 0 0 2 6.25v13.5A2.25 2.25 0 0 0 4.25 22h8.56a6.5 6.5 0 0 1-1.078-1.5H4.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v4.826a6.6 6.6 0 0 1 1.5-.057V6.25A2.25 2.25 0 0 0 15.75 4zm.009.096L14 4.25q0-.078-.005-.154M8.25 3.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m3.707 10.604a6.5 6.5 0 0 1 2.147-2.147l.926-.927a.75.75 0 1 0-1.06-1.06L9 14.94l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0zM23 17.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"
    ></path>
  </svg>
);

export default function Navbar() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { boards, selectedBoard, setSelectedBoard } = useBoard();
  const selectedKey = selectedBoard !== null ? String(selectedBoard.id) : '';
  const handleSelectionChange = (key: React.Key) => {
    console.log(key);
    setSelectedBoard(boards.find((board) => board.id === Number(key)) || null);
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
