import Link from 'next/link';

export default function NotFound() {
  //   return (
  //     <div>
  //       <h2>Not Found</h2>
  //       <p>Could not find requested resource</p>
  //       <Link href="/">Return Home</Link>
  //     </div>
  //   );
  return (
    <div className="w-full max-w-[80%] mx-auto min-h-svh flex-grow flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-8xl text-center font-semibold">404</h1>
      <p className="text-xl text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-base text-secondary text-center">
        It looks like the page you&apos;re trying to reach isn&apos;t available.
        You can go back to the homepage or contact our{' '}
        <a
          className="text-center text-primary underline"
          href="https://valenzuela.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          development team
        </a>{' '}
        if you need further assistance.
      </p>
      <Link href="/" className="mt-4">
        <button className="bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary/70 transition duration-300 hover:scale-110">
          Return Home
        </button>
      </Link>
    </div>
  );
}
