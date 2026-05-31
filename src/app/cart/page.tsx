'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';

export default function CartPage() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

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
        <h1 className="text-2xl font-bold">Your cart</h1>
        <button
          className="text-red-muted hover:text-red-muted-light cursor-pointer font-semibold active:brightness-106"
          onClick={() => clearCart()}
        >
          {TEXT.clearCart}
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
              <img src="/example-image.png" alt="" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.45)_100%)]" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-neutral-500">${item.price * item.quantity}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary-outline"
                    className="flex h-8 w-8 items-center justify-center px-0 py-0"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="primary-outline"
                    className="flex aspect-square h-8 w-8 items-center justify-center px-0 py-0"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <button
                  className="hover:text-red-muted active:text-red-muted-light cursor-pointer text-neutral-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-neutral-500">{TEXT.total}</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <Button variant="primary" className="w-full" onClick={() => router.push('/checkout')}>
          {TEXT.checkout}
        </Button>
      </div>
    </main>
  );
}
