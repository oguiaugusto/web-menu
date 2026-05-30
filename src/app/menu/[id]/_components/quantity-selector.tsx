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
    <div className="bg-red-muted flex items-center rounded-xl text-white">
      <button
        className="cursor-pointer p-3 hover:drop-shadow-[0px_1px_1px_rgba(255,255,255,0.6)] disabled:opacity-70 hover:disabled:drop-shadow-none"
        onClick={handleSub}
        disabled={quantity === 1}
      >
        <Minus size={20} />
      </button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <button className="cursor-pointer p-3 hover:drop-shadow-[0px_1px_1px_rgba(255,255,255,0.6)]" onClick={handleAdd}>
        <Plus size={20} className="" />
      </button>
    </div>
  );
}
