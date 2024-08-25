'use client';
import React from 'react';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';

import { svgSun, svgMoon } from '@/utils/svgIcons';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      size="md"
      color="success"
      startContent={svgSun}
      endContent={svgMoon}
      aria-label="Switch Color Theme"
      isSelected={(theme === 'light' && true) || false}
      onValueChange={(value) => setTheme(value ? 'light' : 'dark')}
    />
  );
}
