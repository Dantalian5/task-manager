import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FocusDesk | by MV',
  description: 'Stay focused and organized with a desk that works for you.',
  openGraph: {
    title: 'FocusDesk | by MV',
    description: 'Stay focused and organized with a desk that works for you.',
    url: 'https://frontend-feedback.vercel.app/',
    siteName: 'frontend-feedback',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusDesk | by MV',
    description: 'Stay focused and organized with a desk that works for you.',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/assets/favicon/apple-touch-icon.png',
    },
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.className} bg-space-gradient from-background to-background-light w-full h-full min-h-svh flex flex-col items-stretch justify-stretch`}
      >
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            className: 'bg-background p-40 text-foreground',
          }}
        />
      </body>
    </html>
  );
}
