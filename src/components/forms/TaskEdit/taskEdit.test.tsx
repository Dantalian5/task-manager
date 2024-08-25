import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskEdit from '@/components/forms/TaskEdit';
import { useSelectedBoard } from '@/context/BoardsProvider';
import { Task } from '@/types/global';
import { z } from 'zod';

// Mock de las dependencias
jest.mock('@/context/BoardsProvider', () => ({
  useSelectedBoard: jest.fn(),
}));

const mockColumns = [
  { id: 1, name: 'Todo' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'Done' },
];

describe('TaskEdit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelectedBoard as jest.Mock).mockReturnValue({
      columns: mockColumns,
      reload: jest.fn(),
    });
  });

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    columnId: 1,
    subTasks: [
      { id: 1, title: 'Subtask 1', isCompleted: false },
      { id: 2, title: 'Subtask 2', isCompleted: true },
    ],
  };

  it('renders the form correctly for editing a task', () => {
    render(
      <TaskEdit
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={jest.fn()}
        task={mockTask}
      />
    );

    expect(screen.getByLabelText(/Title/i)).toHaveValue('Test Task');
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      'This is a test task'
    );
    expect(screen.getAllByLabelText(/Subtask/i)).toHaveLength(2);
  });

  it('shows validation errors when submitting empty fields', async () => {
    render(
      <TaskEdit
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={jest.fn()}
        task={mockTask}
      />
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully when all fields are valid for editing', async () => {
    const mockSetTask = jest.fn();
    const mockOnClose = jest.fn();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockTask),
    });

    render(
      <TaskEdit
        isOpen={true}
        onOpenChange={jest.fn()}
        onClose={mockOnClose}
        task={mockTask}
        setTask={mockSetTask}
      />
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Updated Task' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('creates a new task when no task is provided', async () => {
    const mockOnClose = jest.fn();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        id: 99,
        title: 'New Task',
        description: 'This is a new task',
        columnId: 1,
        subTasks: [],
      }),
    });

    render(
      <TaskEdit isOpen={true} onOpenChange={jest.fn()} onClose={mockOnClose} />
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
