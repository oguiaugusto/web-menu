'use client';

import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';
import { CartItem } from './_components/cart-item';
import EmptyCart from '@/components/empty-cart';

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  if (items.length === 0) return <EmptyCart />;

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-bold">{TEXT.yourCart}</h1>
        <Button variant="primary-text" onClick={() => clearCart()}>
          {TEXT.clearCart}
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem key={`cart-item-${item.id}`} item={item} />
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-neutral-500">{TEXT.total}</span>
          <span className="text-xl font-bold">{TEXT.currency}{subtotal.toFixed(2)}</span>
        </div>
        <Button variant="primary" className="w-full" onClick={() => router.push('/checkout')}>
          {TEXT.checkout}
        </Button>
      </div>
    </main>
  );
}
