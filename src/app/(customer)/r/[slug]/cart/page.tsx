'use client';

import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { CartItem } from './_components/cart-item';
import EmptyCart from '@/components/empty-cart';
import { use } from 'react';
import { rSlug } from '@/utils/r-slug';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default function CartPage({ params }: Props) {
  const { slug } = use(params);
  const { items, subtotal, clearCart } = useCart();

  if (items.length === 0) return <EmptyCart slug={slug} />;

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
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
          <span className="text-xl font-bold">
            {TEXT.currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <Button as={Link} variant="primary" href={rSlug(slug, '/checkout')} className="w-full">
          {TEXT.checkout}
        </Button>
      </div>
    </main>
  );
}
