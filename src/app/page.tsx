import Board from '@/components/layout/Board';
import SideBar from '@/components/layout/SideBar';

import {
  BoardsProvider,
  SelectedBoardProvider,
} from '@/context/BoardsProvider';

export default async function Home() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch h-svh overflow-hidden relative bg-space-gradient from-background to-background-light ">
      <BoardsProvider>
        <SelectedBoardProvider>
          <SideBar />
          <Board />
        </SelectedBoardProvider>
      </BoardsProvider>
    </div>
  );
}
