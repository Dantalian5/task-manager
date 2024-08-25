import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from '@/components/common/TaskDetails';
import { useTask } from '@/context/TaskProvider';
import { useSelectedBoard } from '@/context/BoardsProvider';

jest.mock('@/context/TaskProvider', () => ({
  useTask: jest.fn(),
}));

jest.mock('@/context/BoardsProvider', () => ({
  useSelectedBoard: jest.fn(),
}));

describe('Details', () => {
  const mockOnClose = jest.fn();
  const mockOnEdit = jest.fn();
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task description',
    subTasks: [
      { id: 1, title: 'Subtask 1', isCompleted: false },
      { id: 2, title: 'Subtask 2', isCompleted: true },
    ],
    columnId: 1,
  };
  const mockColumns = [
    { id: 1, name: 'Todo' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Done' },
  ];

  beforeEach(() => {
    (useTask as jest.Mock).mockReturnValue({
      task: mockTask,
      setTask: jest.fn(),
    });
    (useSelectedBoard as jest.Mock).mockReturnValue({
      columns: mockColumns,
      reload: jest.fn(),
    });
  });

  it('renders the task details correctly', () => {
    render(
      <Details
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
  });

  it('handles task deletion', async () => {
    render(
      <Details
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    fireEvent.click(screen.getByText(/Accept/i));
  });

  it('allows column status change', () => {
    render(
      <Details
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />
    );

    const selectElement = screen.getByLabelText('Current Status');
    fireEvent.change(selectElement, { target: { value: '2' } });

    expect(selectElement).toHaveValue('2');
  });

  it('calls the edit function when the edit button is clicked', () => {
    render(
      <Details
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />
    );

    const editButton = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
  });
});
