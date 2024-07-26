import Board from '@/components/layout/Board';
import Navbar from '@/components/layout/Navbar';

import BoardProvider from '@/context/BoardProvider';

export default function Home() {
  const columns = [];

  return (
    <div>
      <BoardProvider>
        <Navbar />
        <Board />
      </BoardProvider>
    </div>
  );
}
