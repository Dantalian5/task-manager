import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
};
export default function UserForm() {
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
      name: userData.name,
      email: userData.email,
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
