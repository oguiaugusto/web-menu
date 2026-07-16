import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { CartProvider } from '@/providers/cart-provider';

export const metadata: Metadata = {
  title: 'Web Menu',
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
