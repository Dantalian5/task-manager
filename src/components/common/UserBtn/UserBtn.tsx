'use client';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { svgDashboard, svgLogout, svgSettings } from '@/utils/svgIcons';

export default function UserBtn() {
  const user = {
    name: 'Jhon Doe',
    email: 'test@email.com',
  };
  return (
    <Dropdown
      placement="bottom-end"
      classNames={{
        content: 'bg-card-gradient from-background to-background-light',
      }}
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          classNames={{
            name: 'text-xl font-semibold uppercase',
            base: 'bg-space-gradient from-background to-background-light',
          }}
          color="primary"
          name={user.name[0]}
          size="md"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="faded">
        <DropdownSection aria-label="Profile" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2"
            textValue="Profile"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Actions">
          <DropdownItem key="team_settings" endContent={svgDashboard} href="/">
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="settings"
            endContent={svgSettings}
            href="/settings"
          >
            My Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            endContent={svgLogout}
            onClick={() => signOut()}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
