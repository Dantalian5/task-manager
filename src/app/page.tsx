import Board from '@/components/layout/Board';
import Navbar from '@/components/layout/Navbar';

import BoardProvider from '@/context/BoardProvider';

export default async function Home() {
  const boards = await fetch(`${'http://192.168.1.55:3000'}/api/boards`).then(
    (res) => res.json()
  );
  const initialBoard = await fetch(
    `${'http://192.168.1.55:3000'}/api/boards/${boards[0].id}`
  ).then((res) => res.json());

  return (
    <div className="flex flex-col sm:flex-row items-stretch min-h-svh">
      <BoardProvider initialBoards={boards} initialSelectedBoard={initialBoard}>
        <Navbar />
        <Board />
      </BoardProvider>
    </div>
  );
}
