'use client';

import { useSession } from 'next-auth/react';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import { signOut } from 'next-auth/react';

import ThemeSwitch from '@/components/common/ThemeSwitch';
import { svgDashboard, svgLogout, svgSettings } from '@/utils/svgIcons';

export default function UserBtn() {
  const session = useSession();

  const user = {
    name: session?.data?.user?.name || '',
    email: session?.data?.user?.email || '',
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
            name: 'text-xl font-semibold uppercase text-foreground',
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
            <p className="font-normal text-xs text-secondary">Signed in as</p>
            <p className="font-semibold">{user.name}</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Actions" showDivider>
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
        <DropdownSection aria-label="Theme" className="sm:hidden">
          <DropdownItem
            key="Switch Theme"
            startContent={<ThemeSwitch />}
            textValue="Switch Theme"
          ></DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
