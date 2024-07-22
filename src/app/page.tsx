import Board from '@/components/layout/Board';
import Navbar from '@/components/layout/Navbar';
import BoardProvider from '@/context/BoardProvider';
import ColumnsProvider from '@/context/ColumnsProvider';

export default function Home() {
  const columns = [];

  return (
    <div>
      <BoardProvider>
        <Navbar />
        <ColumnsProvider>
          <Board />
        </ColumnsProvider>
      </BoardProvider>
    </div>
  );
}
