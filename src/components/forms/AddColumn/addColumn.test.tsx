import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddColumn from '@/components/forms/AddColumn';
import { useSelectedBoard } from '@/context/BoardsProvider';

jest.mock('@/context/BoardsProvider', () => ({
  useSelectedBoard: jest.fn(),
}));

describe('AddColumn', () => {
  const mockReload = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSelectedBoard as jest.Mock).mockReturnValue({
      reload: mockReload,
      board: { id: 1, title: 'Test Board' },
    });
  });

  it('renders the form correctly when the modal is open', () => {
    render(
      <AddColumn isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    // Verifica que se renderizan correctamente los campos
    expect(screen.getByLabelText(/Column Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('submits the form successfully when all fields are valid', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'Todo' }),
      })
    ) as jest.Mock;

    render(
      <AddColumn isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.input(screen.getByLabelText(/Column Name/i), {
      target: { value: 'Todo' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/columns', expect.any(Object));
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(mockReload).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors if the column name is left empty', async () => {
    render(
      <AddColumn isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    // Enviar el formulario sin llenar el nombre de la columna
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Column name is required/i)).toBeInTheDocument();
    });
  });

  it('resets the form when the modal is closed', async () => {
    const { rerender } = render(
      <AddColumn isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.input(screen.getByLabelText(/Column Name/i), {
      target: { value: 'Todo' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    rerender(
      <AddColumn isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Column Name/i)).toHaveValue('');
    });
  });
});
