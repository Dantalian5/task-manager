'use client';

import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full max-w-[80%] mx-auto h-full flex-grow flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl text-center font-semibold">Oops!</h2>
      <p className="text-xl text-center">Something went wrong.</p>
      <Divider />
      <p className="text-base text-secondary">
        Please try again, or reach out to our{' '}
        <a
          className="text-center text-primary underline"
          href="https://valenzuela.dev"
        >
          development team
        </a>{' '}
        for assistance .
      </p>
      <Button color="primary" size="lg" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
