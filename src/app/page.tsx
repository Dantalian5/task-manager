import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import IntroPage from '@/components/common/IntroPage/IntroPage';
import { svgLogo } from '@/utils/svgIcons';
import ThemeSwitch from '@/components/common/ThemeSwitch';

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <>
      <header className="w-full flex flex-col items-center justify-start min-h-svh overflow-hidden relative ">
        <nav className="flex w-full items-center  border-b border-border/10 justify-between gap-4 relative z-20 backdrop-blur-sm shadow-bottom bg-gradient-to-b from-background/5 to-background-light/20 p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-base">{svgLogo}</span>
            <p className="text-xl font-bold text-foreground hidden sm:block">
              FocusDesk
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href={'/about'} className="text-xl text-foreground">
              About
            </Link>
            <ThemeSwitch />
          </div>
        </nav>
        <div className="w-[80%] flex flex-wrap items-center justify-center gap-x-6 gap-y-10 py-10 flex-grow">
          <div className="flex-[1_1_350px]">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-4">
              <span className="text-5xl">{svgLogo}</span>
              <h1 className="text-4xl font-bold text-foreground">FocusDesk</h1>
            </div>
            <p className="text-lg text-secondary text-center">
              Stay focused and organized with a desk that works for you.
            </p>
          </div>
          <div className="bg-card-gradient from-background to-background-light rounded-lg flex flex-col gap-6 p-6 sm:p-8 shadow-lg backdrop-blur-sm flex-[1_1_350px] max-w-[460px]">
            <IntroPage />
          </div>
        </div>
      </header>
      <section></section>
    </>
  );
}
