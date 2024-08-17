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

import Sidebar from '@/components/common/Sidebar';

export default function Settings() {
  return (
    <div className="flex flex-row items-stretch h-svh overflow-hidden relative">
      <Sidebar />
    </div>
  );
}
