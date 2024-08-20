import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import IntroPage from '@/components/common/IntroPage/IntroPage';

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  return (
    <div className="w-full flex flex-row items-center justify-center h-svh overflow-hidden relative">
      <div className="w-[80%] flex items-center gap-6">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-foreground mb-4">FocusDesk</h1>
          <p className="text-lg text-secondary">
            Stay focused and organized with a desk that works for you.
          </p>
        </div>
        <div className="bg-card-gradient from-background to-background-light rounded-lg flex flex-col gap-6 p-6 sm:p-8 shadow-lg backdrop-blur-sm w-full max-w-[460px]">
          <IntroPage />
        </div>
      </div>
    </div>
  );
}
