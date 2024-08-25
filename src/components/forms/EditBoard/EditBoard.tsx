'use client';
import { useEffect, useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler, set } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@nextui-org/spinner';

import BtnConfirm from '@/components/common/BtnConfirm';
import { type BoardSchema, boardSchema } from '@/schemas/boardSchema';
import { useSelectedBoard, useBoards } from '@/context/BoardsProvider';
import { svgClose, svgDelete } from '@/utils/svgIcons';

interface BoardEditProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  action?: 'add' | 'edit';
}

export default function BoardEdit({
  isOpen,
  onOpenChange,
  onClose,
}: BoardEditProps) {
  const { changeSelectedBoard, reload: reloadBoards } = useBoards();
  const { board, reload } = useSelectedBoard();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BoardSchema>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: '', columns: [] },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'columns',
  });

  useEffect(() => {
    if (board) {
      reset({
        title: board.title,
      });
      replace(
        board.columns.map((column) => ({
          id: column.id,
          name: column.name,
        }))
      );
    }
  }, [board, reset, replace]);

  const onSubmit: SubmitHandler<BoardSchema> = async (data) => {
    setIsSaving(true);
    try {
      const payload = {
        id: board.id,
        title: data.title,
        columns: data.columns.map((column: any) => ({
          id: column.id || undefined,
          name: column.name,
        })),
      };

      const response = await fetch(`/api/boards/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update board');
      }

      const updatedBoard = await response.json();
      reload();
      reloadBoards();
      onClose();
    } catch (error) {
      console.error('Error updating board:', error);
    }
    setIsSaving(false);
  };
  const onCloseModal = () => {
    reset();
    onClose();
  };
  const onDelete = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/boards/${board.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete board');
      }
      changeSelectedBoard(null);
      onClose();
    } catch (error) {
      console.error('Error deleting board:', error);
    }
    setIsSaving(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="w-[90%]"
      onClose={onCloseModal}
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        wrapper: 'w-full',
        base: 'p-2 w-[90%] max-w-[480px] bg-card-gradient from-background to-background-light',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {isSaving && (
              <div className="inset-0 absolute bg-background/50 z-50 flex items-center justify-center backdrop-blur-sm">
                <Spinner size="lg" />
              </div>
            )}
            <ModalHeader className="flex flex-col gap-1">
              Edit Board
            </ModalHeader>
            <ModalBody className="mb-4">
              <form
                id="task-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <Input
                  type="text"
                  labelPlacement="outside"
                  label="Board Name"
                  isInvalid={!!errors.title?.message}
                  errorMessage={errors.title?.message}
                  variant="bordered"
                  radius="sm"
                  placeholder="e.g. New Board"
                  isClearable
                  color="secondary"
                  classNames={{
                    label: 'text-sm font-semibold text-secondary',
                    inputWrapper: 'border hover:border-primary',
                  }}
                  {...register('title')}
                />
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-secondary">
                    Board Columns
                  </label>
                  {fields.map((column, index) => (
                    <div
                      key={column.id}
                      className="flex gap-4 w-full items-center justify-center"
                    >
                      <Input
                        type="text"
                        isInvalid={!!errors.columns?.[index]?.name?.message}
                        errorMessage={errors.columns?.[index]?.name?.message}
                        variant="bordered"
                        radius="sm"
                        classNames={{
                          inputWrapper: 'border hover:border-primary',
                        }}
                        {...register(`columns.${index}.name` as const)}
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
                  <Button color="primary" onClick={() => append({ name: '' })}>
                    + Add New Column
                  </Button>
                </div>
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <BtnConfirm
                onConfirm={onDelete}
                color="danger"
                type="button"
                aria-label="delete"
                startContent={svgDelete}
                className="mr-auto text-lg"
                isIconOnly
                title="Delete Board"
                message="Are you sure you want to delete this Board?"
              />
              <Button color="default" onClick={onCloseModal} type="button">
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
