'use client';
import React, { useEffect, useRef } from 'react';

import { Divider } from '@nextui-org/divider';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Button } from '@nextui-org/button';

import UserBtn from '@/components/common/UserBtn';
import ThemeSwitch from '@/components/common/ThemeSwitch';
import { useApp } from '@/context/AppProvider';
import { svgDelete, svgHide, svgShow } from '@/utils/svgIcons';

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
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    interactiveRef: ignoreRef,
  } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  const [isHidden, setIsHidden] = React.useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !ignoreRef.current?.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${
        isHidden ? 'sm:max-w-[80px]' : 'sm:max-w-[260px] lg:max-w-[300px]'
      } absolute top-20 left-0 bottom-0 w-[80%] sm:w-full flex flex-col border-r border-border/10 sm:relative z-50 sm:top-0 sm:left-0 sm:bottom-0 sm:translate-x-0 transition`}
    >
      <div className="hidden sm:flex w-full items-center p-5 border-b border-border/10 shadow-bottom justify-between bg-gradient-to-br from-background/10 to-background-light/20">
        <UserBtn />
      </div>
      <div className="flex w-full flex-col overflow-hidden flex-grow bg-gradient-to-r from-background/5 to-background-light/20 sm:backdrop-blur-sm backdrop-blur-xl shadow-right">
        <div
          className={`${
            isHidden ? 'sm:hidden' : 'flex'
          } w-full flex-col overflow-hidden flex-grow`}
        >
          {children}
        </div>
        <div className="flex flex-col p-3 items-start justify-start mt-auto gap-2">
          <Divider className="w-full" />
          <ThemeSwitch />
          <Button
            size="md"
            isIconOnly={isHidden}
            startContent={isHidden ? svgShow : svgHide}
            variant={'light'}
            color="primary"
            onPress={() => setIsHidden((prev) => !prev)}
            className="text-foreground hidden sm:flex"
            aria-label="Toogle Sidebar"
          >
            {!isHidden && 'Hide Sidebar'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
export { SidebarBody, SidebarActions };
