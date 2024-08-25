import React from 'react';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Divider } from '@nextui-org/divider';

import UserForm from '@/components/forms/UserForm';
import SettingTabs from '@/components/common/SettingTabs';
import { svgUserSettings } from '@/utils/svgIcons';
import { Sidebar, SidebarBody } from '@/components/layout/SideBar';
import TopBar from '@/components/layout/TopBar';
import SecurityForm from '@/components/forms/SecurityForm';
import SettingsForm from '@/components/forms/SettingsForm';

export default async function Settings() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const user = session?.user as {
    id: string;
    name: string;
    email: string;
  };

  return (
    <div className="flex flex-row items-stretch h-svh overflow-hidden relative">
      <Sidebar>
        <SidebarBody>
          <SettingTabs />
        </SidebarBody>
      </Sidebar>
      <main className="w-full flex flex-col items-stretch flex-grow overflow-scroll">
        <TopBar>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground w-full overflow-hidden overflow-ellipsis whitespace-nowrap p-2 flex items-center gap-2">
            {svgUserSettings} User Settings
          </h2>
        </TopBar>
        <div className=" flex items-start justify-center p-6 pb-10 overflow-x-scroll w-full h-full flex-grow relative z-10">
          {user && (
            <div className="w-full sm:w-[80%] max-w-[600px] flex flex-col gap-6">
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
