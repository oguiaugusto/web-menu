import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Header } from '@/components/header';
import { CartProvider } from '@/providers/cart-provider';
import { inter } from '@/constants/fonts';
import '../globals.css';

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
        <Toaster offset={{ top: 70 }} mobileOffset={{ top: 70 }} />
        <ScrollToTop />
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
