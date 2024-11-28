import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './font.css';
import { SessionProvider } from 'next-auth/react';
import TanStackProvider from '@/providers/tan-stack-provider';
import { Toaster } from 'sonner';
import { auth } from '@/auth';
import type { CustomUser } from '@/types';
import Footer from '@/components/landing/Footer';
import { CartContextProvider } from '@/components/new/CardContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Captain Side Gaming | Win Prizes in Competitive Gaming Tournaments',
  description:
    'Enter the world of Captain Side Gaming, where gamers compete for glory and prizes. Join thrilling tournaments across popular game titles, showcase your skills, and win real rewards. Our platform offers easy registration, fair matchmaking, and exciting competitions for players of all levels. Start your journey to gaming stardom and prize-winning today!',
  applicationName: 'Captain Side Gaming',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://www.captainside.com/',
  },
  keywords: [
    'Gaming Tournaments',
    'Prize Competitions',
    'Esports',
    'Competitive Gaming',
    'Online Tournaments',
    'Game Registration',
    'Gaming Rewards',
    'Multiplayer Contests',
    'Cash Prizes',
    'Tournament Platform',
  ],
  authors: [{ name: 'Captain Side Gaming' }],
  creator: 'Finzie',
  publisher: 'Dhruv Rekhawat',
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <SessionProvider session={session}>
          <CartContextProvider>
          <TanStackProvider>{children}</TanStackProvider>
          <Toaster position="top-right" richColors />
          </CartContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
