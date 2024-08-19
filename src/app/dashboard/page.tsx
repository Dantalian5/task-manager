import Board from '@/components/layout/Board';
import SideBar from '@/components/layout/SideBar';

import {
  BoardsProvider,
  SelectedBoardProvider,
} from '@/context/BoardsProvider';

export default async function Dashboard() {
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
