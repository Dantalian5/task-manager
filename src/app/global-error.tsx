'use client'; // Error boundaries must be Client Components
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <div className="w-full max-w-[80%] mx-auto min-h-svh flex-grow flex flex-col items-center justify-center gap-6 p-4">
          <h1 className="text-4xl text-center font-semibold">
            Oops! Something went wrong!
          </h1>
          <p className="text-lg text-center text-foreground">
            We encountered an unexpected error while loading the application.
          </p>
          <p className="text-base text-secondary text-center">
            Please try refreshing the page, or return to the homepage. If the
            problem persists, contact our{' '}
            <a
              className="text-center text-primary underline"
              href="https://valenzuela.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              development team
            </a>{' '}
            for further assistance.
          </p>
          <div className="flex gap-4 items-center justify-center flex-wrap mt-4">
            <button
              onClick={() => reset()}
              className="bg-primary  px-4 py-2 rounded-md shadow hover:bg-primary/70 transition duration-300 hover:scale-110"
            >
              Refresh Page
            </button>
            <Link href="/" className="">
              <button className="bg-secondary text-white px-4 py-2 rounded-md shadow hover:bg-primary/70 transition duration-300 hover:scale-110">
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
