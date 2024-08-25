import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '@/components/forms/UserForm';
import { updateUser } from '@/actions/userActions';

// Mock de las dependencias
jest.mock('@/actions/userActions', () => ({
  updateUser: jest.fn(),
}));

describe('UserForm', () => {
  const mockUserData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with user data correctly', () => {
    render(<UserForm userData={mockUserData} />);

    expect(screen.getByLabelText(/Username/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@email.com');
  });

  it('shows validation errors when fields are empty', async () => {
    render(<UserForm userData={mockUserData} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully when all fields are valid', async () => {
    (updateUser as jest.Mock).mockResolvedValue({ status: 201 });

    render(<UserForm userData={mockUserData} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'jane.doe@email.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        name: 'Jane Doe',
        email: 'jane.doe@email.com',
      });
    });
  });

  it('resets the form when the cancel button is clicked', () => {
    render(<UserForm userData={mockUserData} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'jane.doe@email.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(screen.getByLabelText(/Username/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@email.com');
  });
});
