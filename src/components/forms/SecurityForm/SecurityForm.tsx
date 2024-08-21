import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { updateUserPassword } from '@/actions/userActions';
import { updateUserPass, type UpdateUserPass } from '@/schemas/userSchema';

export default function SecurityForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const userData = {
    name: 'Test User',
    email: 'test@email.com',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserPass>({
    resolver: zodResolver(updateUserPass),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit: SubmitHandler<UpdateUserPass> = async (data) => {
    setIsSaving(true);
    try {
      const res = await updateUserPassword(data);
      switch (res.status) {
        case 200:
          toast.success('Password updated successfully');
          break;
        case 401:
          toast.error('Incorrect old password');
          break;
        case 404:
          toast.error('Error updating user');
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
      id="securityForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="text-xl font-bold ">Security:</p>
        <p className="text-xs font-normal text-secondary">
          Modify your security settings
        </p>
      </div>
      <Input
        type="password"
        labelPlacement="outside"
        label="Old Password"
        isInvalid={!!errors.oldPassword?.message}
        errorMessage={errors.oldPassword?.message}
        variant="bordered"
        radius="sm"
        isClearable
        color="secondary"
        placeholder="*****"
        classNames={{
          label: 'text-sm font-semibold text-secondary',
          inputWrapper: 'border hover:border-primary',
        }}
        {...register('oldPassword')}
      />
      <Input
        type="password"
        labelPlacement="outside"
        label="New Password"
        isInvalid={!!errors.newPassword?.message}
        errorMessage={errors.newPassword?.message}
        variant="bordered"
        radius="sm"
        isClearable
        color="secondary"
        placeholder="****"
        classNames={{
          label: 'text-sm font-semibold text-secondary',
          inputWrapper: 'border hover:border-primary',
        }}
        {...register('newPassword')}
      />
      <Input
        type="password"
        labelPlacement="outside"
        label="Confirm New Password"
        isInvalid={!!errors.confirmNewPassword?.message}
        errorMessage={errors.confirmNewPassword?.message}
        variant="bordered"
        radius="sm"
        isClearable
        color="secondary"
        placeholder="*****"
        classNames={{
          label: 'text-sm font-semibold text-secondary',
          inputWrapper: 'border hover:border-primary',
        }}
        {...register('confirmNewPassword')}
      />
      <span className="text-xs text-secondary ">
        Changes will be visible after you log out and sign back in.
      </span>
      <div className="w-full flex items-center justify-end gap-4">
        <Button color="default" type="button" onClick={() => reset()}>
          Cancel
        </Button>
        <Button color="primary" type="submit" isDisabled={isSaving}>
          Update
        </Button>
      </div>
    </form>
  );
}
