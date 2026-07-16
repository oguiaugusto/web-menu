import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { inter } from '@/constants/fonts';
import { ScrollToTop } from '@/components/scroll-to-top';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Menu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full">
        <ScrollToTop />
        <Toaster offset={{ top: 70 }} mobileOffset={{ top: 70 }} />
        {children}
      </body>
    </html>
  );
}
