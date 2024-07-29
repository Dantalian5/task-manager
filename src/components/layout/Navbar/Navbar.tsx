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

import SelectBoard from '@/components/common/SelectBoard';
import UserBtn from '@/components/common/UserBtn';
import BoardEdit from '@/components/common/BoardEdit';

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

export default function Navbar() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <>
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
      <BoardEdit
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        action="edit"
      />
    </>
  );
}
