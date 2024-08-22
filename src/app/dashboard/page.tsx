import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Board from '@/components/layout/Board';
import SideBar from '@/components/layout/SideBar';
import { getUserSettings } from '@/actions/userActions';

import {
  BoardsProvider,
  SelectedBoardProvider,
} from '@/context/BoardsProvider';
import type { Settings, SortOrder } from '@/types/global';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
    return null;
  }

  const res = await getUserSettings();

  const settings =
    res?.status === 200
      ? res.settings
      : {
          boardSortBy: 'dateNewest',
          columnSortBy: 'dateNewest',
          taskSortBy: 'dateNewest',
        };

  return (
    <div className="w-full flex flex-row items-stretch justify-start h-svh overflow-hidden relative">
      <BoardsProvider
        sortBoardsBy={(settings?.boardSortBy || 'dateNewest') as SortOrder}
      >
        <SelectedBoardProvider>
          <SideBar />
          <Board />
        </SelectedBoardProvider>
      </BoardsProvider>
    </div>
  );
}
