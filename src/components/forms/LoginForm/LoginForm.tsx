'use client';
import React from 'react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

import { type LoginUserSchema, loginUserSchema } from '@/schemas/userSchema';

export default function LoginForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginUserSchema> = async (data) => {
    setIsSaving(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (await !res?.error) {
        toast.success('Successfully logged in');
        router.push('/');
      } else {
        toast.error('Invalid email or password');
        reset();
      }
    } catch (error) {
      console.error('Error submiting task:', error);
    }
    setIsSaving(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] max-w-[480px] bg-card-gradient from-background to-background-light rounded-lg flex flex-col gap-4 p-6 sm:p-8 shadow-lg"
    >
      <h1 className="text-2xl text-center mb-4">Sign In</h1>
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
        placeholder="e.g. your@email.com"
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
      <div className="w-full flex items-center justify-between gap-4 mt-4">
        <LinkUI href="/" color="primary" className="text-sm">
          Go Home
        </LinkUI>
        <Button color="primary" type="submit">
          Log In
        </Button>
      </div>
      <div>
        <span className="text-sm text-secondary text-center block w-full">
          Don’t have an account? Please{' '}
          <Link className="text-primary" href={'/register'}>
            Sign Up
          </Link>
          .
        </span>
      </div>
    </form>
  );
}
