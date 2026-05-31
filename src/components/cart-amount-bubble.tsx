'use client';

import { useCart } from '@/providers/cart-provider';

export function CartAmountBubble() {
  const { itemCount } = useCart();

  if (itemCount < 1) return null;

  return (
    <div className="text-red-muted absolute top-[3px] right-[1px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold">
      <p className="mb-[-1px]">{itemCount}</p>
    </div>
  );
}
