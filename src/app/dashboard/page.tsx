import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import {
  Sidebar,
  SidebarBody,
  SidebarActions,
} from '@/components/layout/SideBar';
import TopBar from '@/components/layout/TopBar';
import Board from '@/components/layout/Board';
import TopInfo from '@/components/common/TopInfo';
import BoardsTabs from '@/components/common/BoardsTabs';
import AddBoardBtn from '@/components/common/AddBoardBtn';
import { getUserSettings } from '@/actions/userActions';

import {
  BoardsProvider,
  SelectedBoardProvider,
} from '@/context/BoardsProvider';
import type { SortOrder } from '@/types/global';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
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
        <SelectedBoardProvider
          sortColumnBy={(settings?.columnSortBy || 'dateNewest') as SortOrder}
          sortTaskBy={(settings?.taskSortBy || 'dateNewest') as SortOrder}
        >
          <Sidebar>
            <SidebarBody>
              <BoardsTabs />
            </SidebarBody>
            <SidebarActions>
              <AddBoardBtn />
            </SidebarActions>
          </Sidebar>
          <main className="w-full flex flex-col items-stretch flex-grow overflow-scroll">
            <TopBar>
              <TopInfo />
            </TopBar>
            <Board />
          </main>
        </SelectedBoardProvider>
      </BoardsProvider>
    </div>
  );
}
