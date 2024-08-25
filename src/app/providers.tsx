'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { AppProvider } from '@/context/AppProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        storageKey="AppLocalTheme"
      >
        <SessionProvider>
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
