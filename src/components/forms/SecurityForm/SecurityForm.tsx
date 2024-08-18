import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

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
  } = useForm<Inputs>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
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
      <div className="w-full flex items-center justify-end gap-4">
        <Button color="default" type="button">
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}
