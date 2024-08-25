import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import SettingsForm from '@/components/forms/SettingsForm';
import {
  getUserSettings,
  putUserSettings,
  deleteUser,
} from '@/actions/userActions';

// Mocking the actions and toast notifications
jest.mock('@/actions/userActions', () => ({
  getUserSettings: jest.fn(),
  putUserSettings: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('SettingsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', async () => {
    await act(async () => {
      render(<SettingsForm userId={1} />);
    });

    expect(screen.getByText(/Settings:/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Sort Boards by:/i)[0]).toBeInTheDocument();
    expect(
      screen.getAllByLabelText(/Sort Columns by:/i)[0]
    ).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Sort Tasks by:/i)[0]).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Clear Dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('loads settings correctly on mount', async () => {
    (getUserSettings as jest.Mock).mockResolvedValue({
      status: 200,
      settings: {
        boardSortBy: 'alphaAsc',
        columnSortBy: 'dateNewest',
        taskSortBy: 'updatedOldest',
      },
    });

    await act(async () => {
      render(<SettingsForm userId={1} />);
    });

    await waitFor(() => {
      expect(getUserSettings).toHaveBeenCalled();
      expect(
        screen.getByDisplayValue('Alphabetical (A-Z)')
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('Creation Date (Newest First)')
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('Last Updated (Oldest First)')
      ).toBeInTheDocument();
    });
  });

  it('submits the form successfully when all fields are valid', async () => {
    (putUserSettings as jest.Mock).mockResolvedValue({
      status: 200,
      settings: {
        boardSortBy: 'alphaAsc',
        columnSortBy: 'dateNewest',
        taskSortBy: 'updatedOldest',
      },
    });

    await act(async () => {
      render(<SettingsForm userId={1} />);
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(putUserSettings).toHaveBeenCalledWith({
        boardSortBy: 'alphaAsc',
        columnSortBy: 'dateNewest',
        taskSortBy: 'updatedOldest',
      });
    });
  });

  it('handles Clear Dashboard action correctly with confirmation', async () => {
    global.fetch = jest.fn(
      () => Promise.resolve({ ok: true, status: 200 }) as Promise<Response>
    );

    await act(async () => {
      render(<SettingsForm userId={1} />);
    });

    fireEvent.click(screen.getByRole('button', { name: /Clear Dashboard/i }));

    fireEvent.click(screen.getByRole('button', { name: /Accept/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/boards', {
        method: 'DELETE',
      });
    });
  });

  it('handles Delete User action correctly with confirmation', async () => {
    (deleteUser as jest.Mock).mockResolvedValue({ status: 200 });

    await act(async () => {
      render(<SettingsForm userId={1} />);
    });

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    // Simular la confirmación en el modal
    fireEvent.click(screen.getByRole('button', { name: /Accept/i }));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalled();
    });
  });
});
