'use client';
import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import {
  type RegisterUserSchema,
  registerUserSchema,
} from '@/schemas/userSchema';
import { addUserToDb } from '@/actions/userActions';

export default function Register() {
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterUserSchema> = async (data) => {
    setIsSaving(true);
    try {
      const res = await addUserToDb(data);
      switch (res.status) {
        case 201:
          toast.success('User created successfully');
          reset();
          router.push('/login');
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
    <div className="w-full min-h-svh flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] max-w-[480px] bg-card-gradient from-background to-background-light rounded-lg flex flex-col gap-4 p-6 sm:p-8 shadow-lg"
      >
        <h1 className="text-2xl text-center mb-4">Sign Up</h1>
        <Input
          type="text"
          labelPlacement="outside"
          label="Name"
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message}
          variant="bordered"
          radius="sm"
          isClearable
          color="secondary"
          placeholder="e.g. Jhon Doe"
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
          placeholder="e.g. example@email.com"
          classNames={{
            label: 'text-sm font-semibold text-secondary',
            inputWrapper: 'border hover:border-primary',
          }}
          {...register('email')}
        />
        <Input
          type="password"
          labelPlacement="outside"
          label="Password"
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
          variant="bordered"
          radius="sm"
          isClearable
          color="secondary"
          placeholder="*****"
          classNames={{
            label: 'text-sm font-semibold text-secondary',
            inputWrapper: 'border hover:border-primary',
          }}
          {...register('password')}
        />
        <Input
          type="password"
          labelPlacement="outside"
          label="Confirm Password"
          isInvalid={!!errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message}
          variant="bordered"
          radius="sm"
          isClearable
          color="secondary"
          placeholder="*****"
          classNames={{
            label: 'text-sm font-semibold text-secondary',
            inputWrapper: 'border hover:border-primary',
          }}
          {...register('confirmPassword')}
        />
        <div className="w-full flex items-center justify-between gap-4 mt-4">
          <LinkUI href="/" color="primary" className="text-sm">
            Go Home
          </LinkUI>
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
        <div>
          <p className="text-sm text-secondary text-center ">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
