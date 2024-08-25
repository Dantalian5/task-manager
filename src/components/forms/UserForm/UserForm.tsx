'use client';
import React, { useEffect } from 'react';

import toast from 'react-hot-toast';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateUser } from '@/actions/userActions';
import { updateUserData, type UpdateUserData } from '@/schemas/userSchema';

type UserFormProps = {
  userData?: {
    name: string;
    email: string;
  };
};

export default function UserForm({ userData }: UserFormProps) {
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserData),
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserData> = async (data) => {
    setIsSaving(true);
    try {
      const res = await updateUser(data);
      switch (res.status) {
        case 201:
          toast.success('User updated successfully');
          break;
        case 400:
          toast.error('Please fill in all the fields correctly');
          break;
        case 409:
          toast.error('User with that email already exists');
          break;
        case 500:
          throw new Error('500 Internal Server Error');
        default:
          throw new Error('500 Internal Server Error');
      }
    } catch (error) {
      toast.error('Oops, something went wrong. Try again later');
    }
    setIsSaving(false);
  };

  return (
    <form
      id="userForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="text-xl font-bold ">User:</p>
        <p className="text-xs font-normal text-secondary">
          Modify your personal & contact data
        </p>
      </div>
      <Input
        type="text"
        labelPlacement="outside"
        label="Username"
        isInvalid={!!errors.name?.message}
        errorMessage={errors.name?.message}
        variant="bordered"
        radius="sm"
        isClearable
        color="secondary"
        placeholder='e.g. "John Doe"'
        classNames={{
          label: 'text-sm font-semibold text-secondary',
          inputWrapper: 'border hover:border-primary',
        }}
        {...register('name')}
      />
      <Input
        type="email"
        labelPlacement="outside"
        label="Email"
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
        variant="bordered"
        radius="sm"
        isClearable
        color="secondary"
        placeholder='e.g. "jhon@email.com"'
        classNames={{
          label: 'text-sm font-semibold text-secondary',
          inputWrapper: 'border hover:border-primary',
        }}
        {...register('email')}
      />
      <span className="text-xs text-secondary ">
        Changes will be visible after you log out and sign back in.
      </span>
      <div className="w-full flex items-center justify-end gap-4">
        <Button
          color="default"
          type="button"
          onClick={() =>
            reset({
              name: userData?.name,
              email: userData?.email,
            })
          }
        >
          Cancel
        </Button>
        <Button color="primary" type="submit" isDisabled={isSaving}>
          Update
        </Button>
      </div>
    </form>
  );
}
