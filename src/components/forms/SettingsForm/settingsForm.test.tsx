import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from '@/components/forms/SettingsForm';
import {
  putUserSettings,
  getUserSettings,
  deleteUser,
} from '@/actions/userActions';
import toast from 'react-hot-toast';

// Mocking the user actions and toast notifications
jest.mock('@/actions/userActions', () => ({
  putUserSettings: jest.fn(),
  getUserSettings: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('SettingsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //   it('renders the form correctly', () => {
  //     render(<SettingsForm userId={1} />);

  //     expect(screen.getByText(/Settings:/i)).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Sort Boards by:/i)).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Sort Columns by:/i)).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Sort Tasks by:/i)).toBeInTheDocument();

  //     // Verificar los botones
  //     expect(
  //       screen.getByRole('button', { name: /Clear Dashboard/i })
  //     ).toBeInTheDocument();
  //     expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  //     expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
  //     expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  //   });

  //   it('loads settings correctly on mount', async () => {
  //     (getUserSettings as jest.Mock).mockResolvedValue({
  //       status: 200,
  //       settings: {
  //         boardSortBy: 'alphaAsc',
  //         columnSortBy: 'dateNewest',
  //         taskSortBy: 'updatedOldest',
  //       },
  //     });

  //     render(<SettingsForm userId={1} />);

  //     await waitFor(() => {
  //       expect(getUserSettings).toHaveBeenCalled();
  //       expect(
  //         screen.getByDisplayValue('Alphabetical (A-Z)')
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByDisplayValue('Creation Date (Newest First)')
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByDisplayValue('Last Updated (Oldest First)')
  //       ).toBeInTheDocument();
  //     });
  //   });

  //   it('shows an error if settings fail to load', async () => {
  //     (getUserSettings as jest.Mock).mockRejectedValue(
  //       new Error('Failed to load settings')
  //     );

  //     render(<SettingsForm userId={1} />);

  //     await waitFor(() => {
  //       expect(getUserSettings).toHaveBeenCalled();
  //       expect(toast.error).toHaveBeenCalledWith('Failed to load settings');
  //     });
  //   });

  //   it('submits the form successfully when all fields are valid', async () => {
  //     (putUserSettings as jest.Mock).mockResolvedValue({
  //       status: 200,
  //       settings: {
  //         boardSortBy: 'alphaAsc',
  //         columnSortBy: 'dateNewest',
  //         taskSortBy: 'updatedOldest',
  //       },
  //     });

  //     render(<SettingsForm userId={1} />);

  //     fireEvent.input(screen.getByLabelText(/Sort Boards by:/i), {
  //       target: { value: 'Alphabetical (A-Z)' },
  //     });

  //     fireEvent.input(screen.getByLabelText(/Sort Columns by:/i), {
  //       target: { value: 'Creation Date (Newest First)' },
  //     });

  //     fireEvent.input(screen.getByLabelText(/Sort Tasks by:/i), {
  //       target: { value: 'Last Updated (Oldest First)' },
  //     });

  //     fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  //     await waitFor(() => {
  //       expect(putUserSettings).toHaveBeenCalledWith({
  //         boardSortBy: 'alphaAsc',
  //         columnSortBy: 'dateNewest',
  //         taskSortBy: 'updatedOldest',
  //       });
  //       expect(toast.success).toHaveBeenCalledWith('User deleted successfully');
  //     });
  //   });

  //   it('handles API errors correctly when submitting the form', async () => {
  //     (putUserSettings as jest.Mock).mockResolvedValue({ status: 401 });

  //     render(<SettingsForm userId={1} />);

  //     fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  //     await waitFor(() => {
  //       expect(putUserSettings).toHaveBeenCalled();
  //       expect(toast.error).toHaveBeenCalledWith('Unauthorized Action');
  //     });
  //   });

  //   it('resets the form when Cancel is clicked', () => {
  //     render(<SettingsForm userId={1} />);

  //     fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

  //     expect(screen.getByLabelText(/Sort Boards by:/i)).toHaveValue('dateNewest');
  //     expect(screen.getByLabelText(/Sort Columns by:/i)).toHaveValue(
  //       'dateNewest'
  //     );
  //     expect(screen.getByLabelText(/Sort Tasks by:/i)).toHaveValue('dateNewest');
  //   });

  //   it('handles Clear Dashboard action correctly', async () => {
  //     global.fetch = jest.fn(
  //       () => Promise.resolve({ ok: true, status: 200 }) as Promise<Response>
  //     );

  //     render(<SettingsForm userId={1} />);

  //     fireEvent.click(screen.getByRole('button', { name: /Clear Dashboard/i }));

  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledWith('/api/boards', {
  //         method: 'DELETE',
  //       });
  //       expect(toast.success).toHaveBeenCalledWith(
  //         'All boards, columns and tasks deleted successfully'
  //       );
  //     });
  //   });

  it('handles Delete User action correctly with confirmation', async () => {
    (deleteUser as jest.Mock).mockResolvedValue({ status: 200 });

    render(<SettingsForm userId={1} />);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    expect(screen.getByRole('button', { name: /Accept/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Accept/i }));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('User deleted successfully');
    });
  });
});
