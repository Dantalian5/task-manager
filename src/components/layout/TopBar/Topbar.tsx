import React from 'react';

import UserBtn from '@/components/common/UserBtn';

export default function Topbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center px-4 py-4 sm:py-4 border-b border-border/10 justify-between gap-4 relative z-20 backdrop-blur-sm shadow-bottom bg-gradient-to-b from-background/5 to-background-light/20 sm:min-h-20">
      <div className="sm:hidden block w-fit">
        <UserBtn />
      </div>
      {children}
    </div>
  );
}
