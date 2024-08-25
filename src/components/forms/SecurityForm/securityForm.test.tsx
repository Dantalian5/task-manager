import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecurityForm from '@/components/forms/SecurityForm';
import { updateUserPassword } from '@/actions/userActions';

jest.mock('@/actions/userActions', () => ({
  updateUserPassword: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('SecurityForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<SecurityForm />);

    expect(screen.getByLabelText(/Old Password/i)).toBeInTheDocument();
    const newPasswordInputs = screen.getAllByLabelText(/New Password/i);
    expect(newPasswordInputs).toHaveLength(2);
    newPasswordInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('shows validation errors if fields are left empty and form is submitted', async () => {
    render(<SecurityForm />);

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(screen.getByText(/Old Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/New Password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please confirm your password/i)
      ).toBeInTheDocument();
    });
  });

  it('submits the form successfully when all fields are valid', async () => {
    (updateUserPassword as jest.Mock).mockResolvedValue({ status: 200 });

    render(<SecurityForm />);

    fireEvent.input(screen.getByLabelText(/Old Password/i), {
      target: { value: 'oldpassword' },
    });
    const passwordInputs = screen.getAllByLabelText(/New Password/i);
    fireEvent.input(passwordInputs[0], {
      target: { value: 'newpassword' },
    });
    fireEvent.input(passwordInputs[1], {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: 'oldpassword',
        newPassword: 'newpassword',
        confirmNewPassword: 'newpassword',
      });
    });
  });

  it('handles API errors correctly', async () => {
    (updateUserPassword as jest.Mock).mockResolvedValue({ status: 401 });

    render(<SecurityForm />);

    fireEvent.input(screen.getByLabelText(/Old Password/i), {
      target: { value: 'oldpassword' },
    });
    const passwordInputs = screen.getAllByLabelText(/New Password/i);
    fireEvent.input(passwordInputs[0], {
      target: { value: 'newpassword' },
    });
    fireEvent.input(passwordInputs[1], {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: 'oldpassword',
        newPassword: 'newpassword',
        confirmNewPassword: 'newpassword',
      });
    });
  });

  it('resets the form when Cancel is clicked', () => {
    render(<SecurityForm />);

    fireEvent.input(screen.getByLabelText(/Old Password/i), {
      target: { value: 'oldpassword' },
    });
    const newPasswordInputs = screen.getAllByLabelText(/New Password/i);
    fireEvent.input(newPasswordInputs[0], {
      target: { value: 'newpassword' },
    });
    fireEvent.input(newPasswordInputs[1], {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    const passwordInputs = screen.getAllByLabelText(/Password/i);
    expect(passwordInputs).toHaveLength(3);
    passwordInputs.forEach((input) => {
      expect(input).toHaveValue('');
    });
  });
});
