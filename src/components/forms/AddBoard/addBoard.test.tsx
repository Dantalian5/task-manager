import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import AddBoard from '@/components/forms/AddBoard';
import { useBoards } from '@/context/BoardsProvider';

jest.mock('@/context/BoardsProvider', () => ({
  useBoards: jest.fn(),
}));

describe('AddBoard', () => {
  const changeSelectedBoardMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useBoards as jest.Mock).mockReturnValue({
      changeSelectedBoard: changeSelectedBoardMock,
    });
  });

  it('renders the form correctly when the modal is open', () => {
    render(
      <AddBoard isOpen={true} onOpenChange={jest.fn()} onClose={jest.fn()} />
    );

    expect(screen.getByLabelText(/Board Name/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Add New Column/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('submits the form successfully when all fields are valid', async () => {
    const onCloseMock = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      })
    ) as jest.Mock;

    render(
      <AddBoard isOpen={true} onOpenChange={jest.fn()} onClose={onCloseMock} />
    );

    fireEvent.input(screen.getByLabelText(/Board Name/i), {
      target: { value: 'New Board' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/boards', expect.any(Object));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(changeSelectedBoardMock).toHaveBeenCalledWith(1);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors if the board name is left empty', async () => {
    render(
      <AddBoard isOpen={true} onOpenChange={jest.fn()} onClose={jest.fn()} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Board Name is required/i)).toBeInTheDocument();
    });
  });

  it('resets the form when the modal is closed', async () => {
    const onCloseMock = jest.fn();
    const { rerender } = render(
      <AddBoard isOpen={true} onOpenChange={jest.fn()} onClose={onCloseMock} />
    );

    fireEvent.input(screen.getByLabelText(/Board Name/i), {
      target: { value: 'New Board' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    rerender(
      <AddBoard isOpen={true} onOpenChange={jest.fn()} onClose={onCloseMock} />
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Board Name/i)).toHaveValue('');
      expect(screen.queryAllByLabelText(/Board Columns/i)).toHaveLength(0);
    });
  });
});
