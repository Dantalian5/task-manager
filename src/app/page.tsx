import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import IntroPage from '@/components/common/IntroPage/IntroPage';
import Image from 'next/image';
import { svgLogo } from '@/utils/svgIcons';

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <div className="w-full flex flex-row items-center justify-center min-h-svh overflow-hidden relative py-10">
      <div className="w-[80%] flex flex-wrap items-center justify-center gap-x-6 gap-y-10">
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
    </div>
  );
}
