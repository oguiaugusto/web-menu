'use client';

import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';
import { CartItem } from './_components/cart-item';

export default function CartPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold">{TEXT.emptyCart}</h1>
        <p className="mt-2 text-neutral-500">{TEXT.emptyCartSubtitle}</p>
        <Button variant="primary-outline" className="mt-6" onClick={() => router.push('/menu')}>
          {TEXT.browseMenu}
        </Button>
      </main>
    );
  }

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
          <span className="text-xl font-bold">{TEXT.currency}{total.toFixed(2)}</span>
        </div>
        <Button variant="primary" className="w-full" onClick={() => router.push('/checkout')}>
          {TEXT.checkout}
        </Button>
      </div>
    </main>
  );
}
