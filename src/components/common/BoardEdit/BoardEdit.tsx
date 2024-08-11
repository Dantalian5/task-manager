'use client';
import { useEffect } from 'react';

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
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type BoardSchema, boardSchema } from '@/schemas/boardSchema';
import type { Board } from '@/types/global';
import { useBoard } from '@/context/BoardProvider';

const svgClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
    ></path>
  </svg>
);

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
  action,
}: BoardEditProps) {
  const { selectedBoard, updateBoard, addBoard } = useBoard();

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
  useEffect(() => {
    if (selectedBoard && action === 'edit') {
      reset({
        title: selectedBoard.title,
        columns: selectedBoard.columns,
      });
    }
  }, [selectedBoard, reset, action]);

  const onSubmit: SubmitHandler<BoardSchema> = async (data) => {
    try {
      if (selectedBoard && action === 'edit') {
        await updateBoard({ ...data, id: selectedBoard.id });
      } else {
        await addBoard(data);
      }
      onClose();
    } catch (error) {
      console.error('Error in submit handler:', error);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns' as never,
  });

  const onCloseModal = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="w-[90%]"
      onClose={onCloseModal}
      classNames={{
        wrapper: 'w-full',
        base: 'p-2 w-[90%] max-w-[480px]',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {action === 'add' ? 'Add New' : 'Edit'} Board
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
                        isInvalid={!!errors.columns?.[index]?.message}
                        errorMessage={errors.columns?.[index]?.message}
                        variant="bordered"
                        radius="sm"
                        classNames={{
                          inputWrapper: 'border hover:border-primary',
                        }}
                        {...register(`columns.${index}` as const)}
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
                  <Button color="primary" onClick={() => append('')}>
                    + Add New Column
                  </Button>
                </div>
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              {action === 'edit' && (
                <Button
                  color="danger"
                  onClick={() => console.log('delete board')}
                  className="mr-auto"
                >
                  Delete
                </Button>
              )}
              <Button color="default" onClick={onCloseModal}>
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
