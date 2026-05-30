'use client';

import { TEXT } from '@/constants/text';
import { QuantitySelector } from './quantity-selector';
import { useState } from 'react';

type Props = {
  price: number;
};

export function QuantityAndAdd({ price }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mx-auto flex max-w-235 justify-between gap-4">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <button className="bg-red-muted flex max-w-60 flex-1 cursor-pointer items-center justify-between rounded-xl px-5 py-3 font-medium text-white hover:opacity-90">
        <span>{TEXT.add}</span>
        <span>${price * quantity}</span>
      </button>
    </div>
  );
}
