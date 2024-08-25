'use client';
import React from 'react';

import { Tabs, Tab } from '@nextui-org/tabs';

import { svgUser, svgSecure, svgSettings } from '@/utils/svgIcons';

export default function SettingTabs() {
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
            <span className="overflow-hidden overflow-ellipsis">User</span>
          </div>
        }
      />
      <Tab
        key={'securityForm'}
        title={
          <div className="flex items-center overflow-hidden text-base gap-2">
            <span className="text-base">{svgSecure}</span>
            <span className="overflow-hidden overflow-ellipsis">Security</span>
          </div>
        }
      />
      <Tab
        key={'settingsForm'}
        title={
          <div className="flex items-center overflow-hidden text-base gap-2">
            <span className="text-base">{svgSettings}</span>
            <span className="overflow-hidden overflow-ellipsis">Settings</span>
          </div>
        }
      />
    </Tabs>
  );
}
