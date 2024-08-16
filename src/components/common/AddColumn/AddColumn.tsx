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
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@nextui-org/spinner';
import { z } from 'zod';

import { useSelectedBoard } from '@/context/BoardsProvider';
import { svgClose } from '@/utils/svgIcons';

interface AddColumnProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export const columnSchema = z.object({
  name: z.string().min(1, 'Column name is required'),
});

export type ColumnSchema = z.infer<typeof columnSchema>;

export default function AddColumn({
  isOpen,
  onOpenChange,
  onClose,
}: AddColumnProps) {
  const { reload, board } = useSelectedBoard();
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ColumnSchema>({
    resolver: zodResolver(columnSchema),
    defaultValues: { name: '' },
  });

  const onSubmit: SubmitHandler<ColumnSchema> = async (data) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/columns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, boardId: board.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update board');
      }
      const newColumn = await response.json();
      reload();
      onClose();
    } catch (error) {
      console.error('Error updating board:', error);
    }
    reset();
    setIsSaving(false);
  };

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
              Add New Column
            </ModalHeader>
            <ModalBody className="mb-4">
              <form
                id="column-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <Input
                  type="text"
                  labelPlacement="outside"
                  label="Column Name"
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  variant="bordered"
                  radius="sm"
                  placeholder="e.g. Todo"
                  isClearable
                  color="secondary"
                  classNames={{
                    label: 'text-sm font-semibold text-secondary',
                    inputWrapper: 'border hover:border-primary',
                  }}
                  {...register('name')}
                />
              </form>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="default" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button color="primary" form="column-form" type="submit">
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
