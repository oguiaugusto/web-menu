'use client';

import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants/text';
import { CartItem as CartItemType, useCart } from '@/providers/cart-provider';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
  item: CartItemType;
};

export function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div key={item.id} className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
        <Image src={item.imageUrl ?? ''} alt={item.name} className="h-full w-full object-cover" fill sizes="100%" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.45)_100%)]" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-sm text-neutral-500">{TEXT.currency}{item.price * item.quantity}</p>
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
  );
}
