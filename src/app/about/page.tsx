import React from 'react';
import Link from 'next/link';

import { svgLogo } from '@/utils/svgIcons';
import ThemeSwitch from '@/components/common/ThemeSwitch';

export default function About() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start min-h-svh overflow-hidden relative ">
        <nav className="flex w-full items-center  border-b border-border/10 justify-between gap-4 relative z-20 backdrop-blur-sm shadow-bottom bg-gradient-to-b from-background/5 to-background-light/20 p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-base">{svgLogo}</span>
            <p className="text-xl font-bold text-foreground hidden sm:block">
              FocusDesk
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href={'/'} className="text-xl text-foreground">
              Home
            </Link>
            <ThemeSwitch />
          </div>
        </nav>
        <section className="px-[10%] py-10">
          <h2 className="text-2xl mb-4">What is FocusDesk?</h2>
          <p className="text-base text-secondary mb-4">
            FocusDesk is a powerful task management tool that helps you stay
            organized and focused. Using a Kanban-style board system, FocusDesk
            allows you to manage your tasks, projects, and goals efficiently.
            Create custom boards, add columns to match your workflow, and keep
            track of your progress with tasks and subtasks—all in one place.
          </p>
          <ul className="list-decimal list-inside text-secondary text-base flex flex-col gap-2">
            <li>Intuitive Kanban boards for better task visualization.</li>
            <li>Customizable columns to match your unique workflow.</li>
            <li>Task and subtask management to break down complex projects.</li>
          </ul>
        </section>
        <section className="px-[10%] py-10">
          <h2 className="text-2xl mb-4">Why Choose FocusDesk?</h2>
          <p className="text-base text-secondary mb-4">
            Whether you’re managing a personal to-do list or leading a team
            project, FocusDesk provides the flexibility and tools you need to
            stay productive and focused. Built with cutting-edge technologies
            like Next.js and TypeScript, FocusDesk offers a seamless and fast
            user experience.
          </p>
          <ul className="list-decimal list-inside text-secondary text-base flex flex-col gap-2">
            <li>
              Built for Speed and Performance: Enjoy a smooth, responsive
              interface powered by modern web technologies.
            </li>
            <li>
              Secure and Reliable: Developed with a focus on security and
              reliability, using Prisma ORM with PostgreSQL.
            </li>
            <li>
              Customizable Themes: Choose from light or dark themes to suit your
              style.
            </li>
          </ul>
        </section>
        <section className="px-[10%] py-10">
          <h2 className="text-2xl mb-4">
            Under the Hood: <em>Built with Modern Web Technologies</em>
          </h2>
          <p className="text-base text-secondary mb-4">
            FocusDesk is not just a powerful task management tool; it is also
            built using the latest and most reliable web development
            technologies. From frontend to backend, FocusDesk ensures a smooth,
            secure, and scalable experience.
          </p>
          <h3 className="text-xl mb-4">Frontend:</h3>
          <ul className="list-decimal list-inside text-secondary text-base mb-4 flex flex-col gap-2">
            <li>
              <b>Framework:</b>
              Developed with Next.js, a popular React framework that enables
              server-side rendering and static site generation for optimal
              performance.
            </li>
            <li>
              <b>Language:</b>
              Written in TypeScript, ensuring a strongly typed and error-free
              codebase.
            </li>
            <li>
              <b>UI Library:</b>
              Styled with NextUI and enhanced with TailwindCSS for a clean,
              modern, and highly customizable user interface.
            </li>
            <li>
              <b>Animations:</b>
              Integrated with Framer Motion for smooth, dynamic animations that
              enhance user interaction.
            </li>
          </ul>
          <h3 className="text-xl mb-4">Backend:</h3>
          <ul className="list-decimal list-inside text-secondary text-base mb-4 flex flex-col gap-2">
            <li>
              <b>Routes Handlers:</b>
              Built on Next.js Routes Handlers to handle all backend logic
              seamlessly (API routes equivalent).
            </li>
            <li>
              <b>Authentication:</b>
              Utilizes NextAuth for secure and easy user authentication and
              authorization.
            </li>
            <li>
              <b>ORM and Database:</b>
              Powered by Prisma ORM with PostgreSQL as the primary database,
              ensuring robust and efficient data management.
            </li>
          </ul>
          <h3 className="text-xl mb-4">State Management and Data Fetching:</h3>
          <ul className="list-decimal list-inside text-secondary text-base mb-4 flex flex-col gap-2">
            <li>
              <b>State Management:</b>
              Managed using React Hook Form for form handling and SWR for data
              fetching, ensuring reactive and efficient data management.
            </li>
            <li>
              <b>Validation:</b>
              Implemented with Zod to handle schema validation, keeping the data
              consistent and reliable.
            </li>
          </ul>
          <h3 className="text-xl mb-4">Testing and Quality Assurance</h3>
          <ul className="list-decimal list-inside text-secondary text-base mb-4 flex flex-col gap-2">
            <li>
              <b>Testing Frameworks:</b>
              Comprehensive testing using Jest for unit and integration tests,
              and Playwright for end-to-end testing.
            </li>
            <li>
              <b>Code Quality:</b> Maintained using ESLint and TypeScript,
              ensuring a clean and maintainable codebase.
            </li>
          </ul>
        </section>
        <footer className="flex flex-col w-full items-center justify-center  border-t border-border/10 gap-4 relative z-20 backdrop-blur-sm shadow-bottom bg-gradient-to-b from-background/5 to-background-light/20 p-4">
          <p className="text-center w-[80%] max-w-[600px] mx-auto">
            FocusDesk is an academic project developed by MV. Is not intendet to
            be used in production as it. Please, use it as a reference for your
            own projects or put in contact whit the author for more information.
          </p>
          <p className="text-center w-[80%] max-w-[600px] mx-auto">
            Developed with Love by{' '}
            <a href="https://valenzuela.dev" className="text-bold text-primary">
              MV
            </a>
          </p>
          <div className="w-full flex items-center justify-center p-4 bg-gradient-to-b from-background/5 to-background-light/20">
            <p className="text-secondary text-sm">
              &copy; 2024 FocusDesk. MIT proyect.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
