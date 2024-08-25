'use client';
import React, { useEffect } from 'react';

import { Button } from '@nextui-org/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/select';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  type UpdateUserSettings,
  updateUserSettings,
} from '@/schemas/userSchema';
import {
  deleteUser,
  getUserSettings,
  putUserSettings,
} from '@/actions/userActions';
import BtnConfirm from '@/components/common/BtnConfirm';

import { svgDelete } from '@/utils/svgIcons';
import type { SortOrder } from '@/types/global';

export default function SettingsForm({ userId }: { userId: number }) {
  const [isSaving, setIsSaving] = React.useState(false);
  const orderOptions = [
    { key: 'alphaAsc', value: 'Alphabetical (A-Z)' },
    { key: 'alphaDesc', value: 'Alphabetical (Z-A)' },
    { key: 'dateNewest', value: 'Creation Date (Newest First)' },
    { key: 'dateOldest', value: 'Creation Date (Oldest First)' },
    { key: 'updatedNewest', value: 'Last Updated (Newest First)' },
    { key: 'updatedOldest', value: 'Last Updated (Oldest First)' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserSettings>({
    resolver: zodResolver(updateUserSettings),
    defaultValues: {
      boardSortBy: 'dateNewest' as SortOrder,
      columnSortBy: 'dateNewest' as SortOrder,
      taskSortBy: 'dateNewest' as SortOrder,
    },
  });

  useEffect(() => {
    async function loadSettings() {
      setIsSaving(true);
      try {
        const { status, settings } = await getUserSettings();
        if (status === 200 && settings) {
          reset({
            boardSortBy: settings.boardSortBy as SortOrder,
            columnSortBy: settings.columnSortBy as SortOrder,
            taskSortBy: settings.taskSortBy as SortOrder,
          });
          console.log(settings);
        }
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setIsSaving(false);
      }
    }
    loadSettings();
  }, []);

  const onSubmit: SubmitHandler<UpdateUserSettings> = async (data) => {
    try {
      setIsSaving(true);
      const res = await putUserSettings(data);
      if (res?.status === 200) {
        toast.success('User deleted successfully');
        if (res.settings)
          reset({
            boardSortBy: res.settings.boardSortBy as SortOrder,
            columnSortBy: res.settings.columnSortBy as SortOrder,
            taskSortBy: res.settings.taskSortBy as SortOrder,
          });
      } else if (res?.status === 401) {
        toast.error('Unauthorized Action');
      } else {
        toast.error('Oops, something went wrong. Try again later');
      }
    } catch (error) {
      toast.error('Oops, something went wrong. Try again later');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearBoards = async () => {
    try {
      const response = await fetch(`/api/boards`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      response.status === 200 &&
        toast.success('All boards, columns and tasks deleted successfully');
    } catch (error) {
      toast.error('Oops, something went wrong. Try again later');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsSaving(true);
      const res = await deleteUser();
      if (res?.status === 200) {
        toast.success('User deleted successfully');
      } else if (res?.status === 401) {
        toast.error('Unauthorized Action');
      } else {
        toast.error('Oops, something went wrong. Try again later');
      }
    } catch (error) {
      toast.error('Oops, something went wrong. Try again later');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      id="settingsForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="text-xl font-bold ">Settings:</p>
        <p className="text-xs font-normal text-secondary">
          Modify your dashboard settings
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-base font-semibold text-secondary">Boards:</p>
        <Select
          label="Sort Boards by:"
          variant="bordered"
          labelPlacement="outside"
          selectionMode="single"
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
          isInvalid={!!errors.boardSortBy?.message}
          errorMessage={errors.boardSortBy?.message}
          {...register('boardSortBy')}
        >
          {orderOptions.map((item) => (
            <SelectItem key={item.key}>{item.value}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-base font-semibold text-secondary">Columns:</p>
        <Select
          label="Sort Columns by:"
          variant="bordered"
          labelPlacement="outside"
          selectionMode="single"
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
          isInvalid={!!errors.columnSortBy?.message}
          errorMessage={errors.columnSortBy?.message}
          {...register('columnSortBy')}
        >
          {orderOptions.map((item) => (
            <SelectItem key={item.key}>{item.value}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col w-full gap-2">
        <p className="text-base font-semibold text-secondary">Tasks:</p>
        <Select
          label="Sort Tasks by:"
          variant="bordered"
          labelPlacement="outside"
          selectionMode="single"
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
          isInvalid={!!errors.taskSortBy?.message}
          errorMessage={errors.taskSortBy?.message}
          {...register('taskSortBy')}
        >
          {orderOptions.map((item) => (
            <SelectItem key={item.key}>{item.value}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full gap-4 items-center justify-end flex-wrap">
        <BtnConfirm
          color="danger"
          type="button"
          startContent={svgDelete}
          className="mr-auto"
          title="Clear Dashboard"
          message="Are you sure you want to delete All your boards, columns and tasks? This action cannot be undone."
          label="Clear Dashboard"
          onConfirm={handleClearBoards}
        />
        <Button color="secondary" type="button" onPress={() => reset()}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Update
        </Button>
      </div>
      <div className="w-full flex flex-wrap items-center justify-between border-secondary border-y py-2 mt-10">
        <p className="text-warning text-base">Delete User</p>
        <BtnConfirm
          onConfirm={handleDeleteUser}
          color="danger"
          type="button"
          startContent={svgDelete}
          isDisabled={isSaving}
          title="Delete User"
          message="Are you sure you want to delete your account? This action cannot be undone."
          label="Delete"
        />
      </div>
    </form>
  );
}
