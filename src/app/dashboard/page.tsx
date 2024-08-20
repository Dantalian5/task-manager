import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Board from '@/components/layout/Board';
import SideBar from '@/components/layout/SideBar';

import {
  BoardsProvider,
  SelectedBoardProvider,
} from '@/context/BoardsProvider';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
    return null;
  }

  return (
    <div className="w-full flex flex-row items-stretch justify-start h-svh overflow-hidden relative">
      <BoardsProvider>
        <SelectedBoardProvider>
          <SideBar />
          <Board />
        </SelectedBoardProvider>
      </BoardsProvider>
    </div>
  );
}
