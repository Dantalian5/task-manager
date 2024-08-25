import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '@/components/common/ConfirmModal';

describe('ConfirmModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal with the correct title and message', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
      />
    );

    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this item?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Accept/i })).toBeInTheDocument();
  });

  it('calls onConfirm and onClose when "Accept" is clicked', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Accept/i }));

    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when "Cancel" is clicked', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <ConfirmModal
        isOpen={false}
        onOpenChange={mockOnOpenChange}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
      />
    );

    expect(screen.queryByText('Delete Item')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Are you sure you want to delete this item?')
    ).not.toBeInTheDocument();
  });
});
