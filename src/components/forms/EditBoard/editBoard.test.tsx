import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BoardEdit from '@/components/forms/EditBoard';
import { useBoards, useSelectedBoard } from '@/context/BoardsProvider';

jest.mock('@/context/BoardsProvider', () => ({
  useBoards: jest.fn(),
  useSelectedBoard: jest.fn(),
}));

describe('BoardEdit', () => {
  const mockChangeSelectedBoard = jest.fn();
  const mockReloadBoards = jest.fn();
  const mockReloadSelectedBoard = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useBoards as jest.Mock).mockReturnValue({
      changeSelectedBoard: mockChangeSelectedBoard,
      reload: mockReloadBoards,
    });
    (useSelectedBoard as jest.Mock).mockReturnValue({
      board: {
        id: 1,
        title: 'Test Board',
        columns: [
          { id: 1, name: 'Todo' },
          { id: 2, name: 'In Progress' },
        ],
      },
      reload: mockReloadSelectedBoard,
    });
  });

  it('renders the form correctly when the modal is open', () => {
    render(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    expect(screen.getByLabelText(/Board Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Board Name/i)).toHaveValue('Test Board');
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('submits the form successfully when all fields are valid', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, title: 'Updated Board' }),
      })
    ) as jest.Mock;

    render(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.input(screen.getByLabelText(/Board Name/i), {
      target: { value: 'Updated Board' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/boards/1', expect.any(Object));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(mockReloadSelectedBoard).toHaveBeenCalledTimes(1);
      expect(mockReloadBoards).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors if the board name is left empty', async () => {
    render(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.input(screen.getByLabelText(/Board Name/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Board name is required/i)).toBeInTheDocument();
    });
  });

  it('handles board deletion correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    fireEvent.click(screen.getByText(/Accept/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/boards/1', expect.any(Object));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(mockChangeSelectedBoard).toHaveBeenCalledWith(null);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('resets the form when the modal is closed', async () => {
    const { rerender } = render(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.input(screen.getByLabelText(/Board Name/i), {
      target: { value: 'Changed Board Name' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    rerender(
      <BoardEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Board Name/i)).toHaveValue('');
    });
  });
});
