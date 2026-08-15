'use client';

import { useCart } from '@/providers/cart-provider';

type Props = Readonly<{
  variant?: 'header' | 'bottom-nav';
}>;

const VARIANTS = {
  header: 'text-red-muted top-[3px] right-[1px] h-[15px] w-[15px] bg-neutral-100 text-[10px] ring-2 ring-red-muted',
  'bottom-nav': 'bg-red-muted -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] text-white ring-2 ring-white',
};

export function CartAmountBubble({ variant = 'header' }: Props) {
  const { itemCount } = useCart();

  if (itemCount < 1) return null;

  return (
    <div className={`absolute flex items-center justify-center rounded-full font-bold ${VARIANTS[variant]}`}>
      <p className="mb-[-1px]">{itemCount}</p>
    </div>
  );
}
