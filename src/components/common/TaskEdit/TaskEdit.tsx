'use client';

import React, { useEffect } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import { Select, SelectItem } from '@nextui-org/select';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@nextui-org/spinner';

import { type TaskSchema, taskSchema } from '@/schemas/taskSchema';
import { useSelectedBoard, useBoards } from '@/context/BoardsProvider';
import { useTask } from '@/context/TaskProvider';
import type { Task } from '@/types/global';

import { svgClose } from '@/utils/svgIcons';

interface EditTaskProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  task?: Task;
  setTask?: (arg0: Task) => void;
}
export default function TaskEdit({
  isOpen,
  onOpenChange,
  onClose,
  task,
  setTask,
}: EditTaskProps) {
  const { columns, reload } = useSelectedBoard();
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      columnId: task?.columnId.toString() || columns[0]?.id.toString() || '',
      subTasks: task?.subTasks || [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'subTasks',
  });

  useEffect(() => {
    reset({
      title: task?.title || '',
      description: task?.description || '',
      columnId: task?.columnId.toString() || columns[0]?.id.toString() || '',
    });
    replace(task?.subTasks || []);
  }, [isOpen]);

  const onCloseModal = () => {
    onClose();
    reset();
  };
  const onSubmit: SubmitHandler<TaskSchema> = async (data) => {
    setIsSaving(true);
    try {
      if (task && setTask) {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, columnId: Number(data.columnId) }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        const updatedTask = await response.json();
        setTask(updatedTask);
      } else {
        const response = await fetch(`/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, columnId: Number(data.columnId) }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        const newTask = await response.json();
        reload();
      }
      reset();
      replace(task?.subTasks || []);
      onClose();
    } catch (error) {
      console.error('Error submiting task:', error);
    }
    setIsSaving(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        wrapper: 'w-full',
        base: 'p-2 w-[90%] max-w-[480px] bg-card-gradient from-background to-background-light',
      }}
      onClose={onCloseModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {isSaving && (
              <div className="inset-0 absolute bg-background/50 z-50 flex items-center justify-center backdrop-blur-sm">
                <Spinner size="lg" />
              </div>
            )}
            <ModalHeader>{task ? 'Edit' : 'Add New'} Task</ModalHeader>
            <ModalBody className="mb-4">
              <form
                id="task-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <Input
                  type="text"
                  labelPlacement="outside"
                  label="Title"
                  isInvalid={!!errors.title?.message}
                  errorMessage={errors.title?.message}
                  variant="bordered"
                  radius="sm"
                  placeholder="e.g. Add new task to board"
                  isClearable
                  color="secondary"
                  classNames={{
                    label: 'text-sm font-semibold text-secondary',
                    inputWrapper: 'border hover:border-primary',
                  }}
                  {...register('title')}
                />
                <Textarea
                  type="text"
                  labelPlacement="outside"
                  label="Description"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  variant="bordered"
                  radius="sm"
                  minRows={4}
                  placeholder="e.g. Add new task description, so you can remember what to do"
                  color="secondary"
                  classNames={{
                    label: 'text-sm font-semibold text-secondary',
                    inputWrapper: 'border',
                  }}
                  {...register('description')}
                />
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-secondary">
                    SubTasks
                  </label>
                  {fields.map((subTask, index) => (
                    <div
                      key={subTask.id}
                      className="flex gap-4 w-full items-center justify-center"
                    >
                      <Input
                        type="text"
                        isInvalid={!!errors.subTasks?.[index]?.title?.message}
                        errorMessage={errors.subTasks?.[index]?.title?.message}
                        variant="bordered"
                        radius="sm"
                        classNames={{
                          inputWrapper: 'border hover:border-primary',
                        }}
                        {...register(`subTasks.${index}.title` as const)}
                      />
                      <Button
                        isIconOnly
                        variant="light"
                        onClick={() => remove(index)}
                        aria-label="Remove subtask"
                        className="w-fit h-fit min-w-fit rounded-none text-2xl"
                      >
                        {svgClose}
                      </Button>
                    </div>
                  ))}
                  <Button
                    color="primary"
                    onClick={() => append({ id: null, title: '' })}
                  >
                    + Add SubTask
                  </Button>
                </div>
                <Select
                  label="Status"
                  classNames={{
                    value: 'capitalize text-foreground text-sm',
                    label: 'text-sm text-secondary font-bold',
                    listbox: 'text-secondary text-sm',
                  }}
                  variant="bordered"
                  size="lg"
                  color="secondary"
                  aria-label="Select Status"
                  labelPlacement="outside"
                  selectionMode="single"
                  radius="sm"
                  isInvalid={!!errors.columnId?.message}
                  errorMessage={errors.columnId?.message}
                  {...register('columnId')}
                >
                  {columns.map((column) => (
                    <SelectItem key={column.id} className=" capitalize">
                      {column.name}
                    </SelectItem>
                  ))}
                </Select>
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="default" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" form="task-form" type="submit">
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
