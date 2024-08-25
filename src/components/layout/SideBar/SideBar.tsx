import React from 'react';

import { Divider } from '@nextui-org/divider';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

import UserBtn from '@/components/common/UserBtn';
import ThemeSwitch from '@/components/common/ThemeSwitch';

function SidebarBody({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-scroll">
      <ScrollShadow className="w-full h-full">{children}</ScrollShadow>
    </div>
  );
}
function SidebarActions({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <Divider className="w-[80%] mx-auto" />
      {children}
    </div>
  );
}
function Sidebar({ children = null }: { children?: React.ReactNode }) {
  return (
    <div className="hidden w-full sm:max-w-[260px] lg:max-w-[300px] sm:flex flex-col border-r border-border/10 relative z-2 ">
      <div className="flex w-full items-center p-5 border-b border-border/10 shadow-bottom justify-between bg-gradient-to-br from-background/10 to-background-light/20">
        <UserBtn />
      </div>
      <div className="flex w-full flex-col overflow-hidden flex-grow bg-gradient-to-r from-background/5 to-background-light/20 backdrop-blur-sm shadow-right">
        {children}
        <div className="flex flex-col p-3 items-start justify-start mt-auto gap-2">
          <Divider className="w-full" />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
export { SidebarBody, SidebarActions };
