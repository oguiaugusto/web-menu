'use client';

import { Dispatch, SetStateAction } from 'react';
import { Minus, Plus } from 'lucide-react';

type Props = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export function QuantitySelector({ quantity, setQuantity }: Props) {
  const handleAdd = () => setQuantity((p) => p + 1);
  const handleSub = () => setQuantity((p) => (p > 1 ? p - 1 : p));

  return (
    <div className="flex items-center rounded-xl bg-neutral-100">
      <button
        className="cursor-pointer p-3 hover:opacity-80 disabled:opacity-40"
        onClick={handleSub}
        disabled={quantity === 1}
      >
        <Minus size={20} />
      </button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <button className="cursor-pointer p-3 hover:opacity-80" onClick={handleAdd}>
        <Plus size={20} />
      </button>
    </div>
  );
}
