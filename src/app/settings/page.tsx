'use client';
import React from 'react';

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

import { Sidebar, SidebarBody } from '@/components/common/Sidebar';

export default function Settings() {
  return (
    <div className="flex flex-row items-stretch h-svh overflow-hidden relative">
      <Sidebar>
        <SidebarBody>
          <Tabs
            defaultSelectedKey={'user'}
            aria-label="Boards"
            isVertical
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
            <Tab
              key={'user'}
              id={'user'}
              title={
                <div className="flex items-center overflow-hidden text-base gap-2">
                  <span className="text-base">{svgBoard}</span>
                  <span className="overflow-hidden overflow-ellipsis">
                    User
                  </span>
                </div>
              }
            />
          </Tabs>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
