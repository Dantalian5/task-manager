'use client';
import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tabs, Tab } from '@nextui-org/tabs';
import { Divider } from '@nextui-org/divider';

import UserForm from '@/components/forms/UserForm';

import {
  svgUser,
  svgSecure,
  svgSettings,
  svgUserSettings,
} from '@/utils/svgIcons';

import { Sidebar, SidebarBody } from '@/components/common/Sidebar';
import SecurityForm from '@/components/forms/SecurityForm';
import SettingsForm from '@/components/forms/SettingsForm';

export default function Settings() {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }
  const user = session?.data?.user as {
    id: string;
    name: string;
    email: string;
  };

  function scrollToId(key: React.Key) {
    const targetId = key as string;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="flex flex-row items-stretch h-svh overflow-hidden relative">
      <Sidebar>
        <SidebarBody>
          <Tabs
            defaultSelectedKey={'user'}
            aria-label="Boards"
            isVertical
            fullWidth
            variant="underlined"
            color="primary"
            onSelectionChange={scrollToId}
            classNames={{
              tabList:
                'gap-2 w-full relative rounded-none pl-0 py-4 pr-4 justify-start items-start',
              cursor: 'w-full bg-success hidden',
              tab: 'h-8 justify-start',
              tabContent:
                'overflow-hidden text-base group-data-[selected=true]:text-success',
            }}
          >
            <Tab
              key={'userForm'}
              title={
                <div className="flex items-center overflow-hidden text-base gap-2">
                  <span className="text-base">{svgUser}</span>
                  <span className="overflow-hidden overflow-ellipsis">
                    User
                  </span>
                </div>
              }
            />
            <Tab
              key={'securityForm'}
              title={
                <div className="flex items-center overflow-hidden text-base gap-2">
                  <span className="text-base">{svgSecure}</span>
                  <span className="overflow-hidden overflow-ellipsis">
                    Security
                  </span>
                </div>
              }
            />
            <Tab
              key={'settingsForm'}
              title={
                <div className="flex items-center overflow-hidden text-base gap-2">
                  <span className="text-base">{svgSettings}</span>
                  <span className="overflow-hidden overflow-ellipsis">
                    Settings
                  </span>
                </div>
              }
            />
          </Tabs>
        </SidebarBody>
      </Sidebar>
      <main className="w-full flex flex-col items-stretch flex-grow overflow-scroll">
        <div className="flex w-full items-center px-4 py-3 sm:py-4 border-b border-border/10 justify-between gap-4 relative z-20 backdrop-blur-sm shadow-bottom bg-gradient-to-b from-background/5 to-background-light/20">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground w-full overflow-hidden overflow-ellipsis whitespace-nowrap p-2 flex items-center gap-2">
            {svgUserSettings} User Settings
          </h2>
        </div>
        <div className=" flex items-start justify-center p-6 pb-10 overflow-x-scroll w-full h-full flex-grow relative z-10">
          {user && (
            <div className="w-[80%] max-w-[600px] flex flex-col gap-6">
              <UserForm userData={user} />
              <Divider />
              <SecurityForm />
              <Divider />
              <SettingsForm userId={Number(user.id)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
