'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

export default function () {
  const router = useRouter();
  const onTryDemo = async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: 'testuser@example.com',
        password: 'securepassword',
      });
      if (await !res?.error) {
        router.push('/dashboard');
      } else {
        throw new Error('Error entering demo mode');
      }
    } catch (error) {
      console.error('Error entering demo mode:', error);
    }
  };

  return (
    <>
      <p className="text-xl text-foreground font-semibold">Get Started Today</p>
      <p className="text-base text-secondary">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Log in
        </Link>
      </p>
      <p className="text-base text-secondary">
        New here?{' '}
        <a href="/signup" className="text-primary font-bold hover:underline">
          Sign up
        </a>{' '}
        and join us.
      </p>
      <p className="text-base text-secondary">
        Just exploring?{' '}
        <button className="text-primary font-bold hover:underline">
          Try our demo board
        </button>{' '}
        to see what FocusDesk can do.
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <Button color="primary" fullWidth className="font-bold text-base ">
          Create an Account
        </Button>
        <Button
          color="secondary"
          fullWidth
          className="font-bold text-base"
          onClick={onTryDemo}
        >
          Try the Demo
        </Button>
      </div>
    </>
  );
}
