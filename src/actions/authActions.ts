'use server';
import { signIn } from '@/auth';

export async function tryDemoUser() {
  try {
    const res = await signIn('credentials', {
      redirect: false,
      email: process.env.NEXT_PUBLIC_DEMO_USER,
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
    });
    if (await !res?.error) {
      return { status: 200, message: 'Demo User loged in' };
    } else {
      return { status: 500, message: 'Internal Server Error' };
    }
  } catch (error) {
    return { status: 500, message: 'Internal Server Error' };
  }
}
