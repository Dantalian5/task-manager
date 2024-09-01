'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { tryDemoUser } from '@/actions/authActions';
import { signIn } from 'next-auth/react';

import { Button } from '@nextui-org/button';

export default function IntroPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onTryDemo = async () => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        redirect: false,
        email: process.env.NEXT_PUBLIC_DEMO_USER,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
      });
      if (await !res?.error) {
        toast.success('Successfully logged in as demo user');
        router.push('/dashboard');
      } else {
        throw new Error('Error entering demo mode');
      }
    } catch (error) {
      console.error('Error entering demo mode:', error);
    } finally {
      setLoading(false);
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
        <Link
          href="/register"
          className="text-primary font-bold hover:underline"
        >
          Sign up
        </Link>{' '}
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
        <Button
          href="/register"
          as={Link}
          color="primary"
          fullWidth
          className="font-bold text-base "
          isLoading={loading}
        >
          Create an Account
        </Button>
        <Button
          color="secondary"
          fullWidth
          className="font-bold text-base"
          onClick={onTryDemo}
          isLoading={loading}
        >
          Try the Demo
        </Button>
      </div>
    </>
  );
}
