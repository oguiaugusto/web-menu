import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { Header } from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Menu',
};

const inter = Figtree({
  subsets: ['latin-ext'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
