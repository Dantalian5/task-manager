import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Select, SelectSection, SelectItem } from '@nextui-org/select';
import toast from 'react-hot-toast';
import { useDisclosure } from '@nextui-org/react';

import { deleteUser } from '@/actions/userActions';
import ConfirmModal from '@/components/common/ConfirmModal';

import { svgDelete } from '@/utils/svgIcons';

type Inputs = {};

export default function SettingsForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const orderOptions = [
    { key: 'alphaAsc', value: 'Alphabetical (A-Z)' },
    { key: 'alphaDesc', value: 'Alphabetical (Z-A)' },
    { key: 'dateNewest', value: 'Creation Date (Newest First)' },
    { key: 'dateOldest', value: 'Creation Date (Oldest First)' },
    { key: 'updatedNewest', value: 'Last Updated (Newest First)' },
    { key: 'updatedOldest', value: 'Last Updated (Oldest First)' },
  ];
  const userData = {
    name: 'Test User',
    email: 'test@email.com',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSaving(true);
    try {
      console.log('Data:', data);
    } catch (error) {
      console.error('Error submiting task:', error);
    }
    setIsSaving(false);
  };

  const handleDeleteUser = async () => {
    setIsSaving(true);
    try {
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
    }
    setIsSaving(false);
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
          defaultSelectedKeys={['alphaAsc']}
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
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
          defaultSelectedKeys={['alphaAsc']}
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
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
          defaultSelectedKeys={['alphaAsc']}
          classNames={{
            popoverContent:
              'bg-card-gradient from-background to-background-light',
          }}
        >
          {orderOptions.map((item) => (
            <SelectItem key={item.key}>{item.value}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full gap-4 items-center justify-end">
        <Button
          color="danger"
          type="button"
          startContent={svgDelete}
          className="mr-auto"
        >
          Clear Dashboard
        </Button>
        <Button color="secondary" type="submit">
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Update
        </Button>
      </div>
      <div className="w-full flex flex-wrap items-center justify-between border-secondary border-y py-2 mt-8">
        <p className="text-warning text-base">Delete User</p>
        <Button
          color="danger"
          type="button"
          startContent={svgDelete}
          isDisabled={isSaving}
          onClick={onOpen}
        >
          Delete
        </Button>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </form>
  );
}
