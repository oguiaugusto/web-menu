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
    <div className="bg-red-muted flex items-center overflow-hidden rounded-lg text-white">
      <button
        className="enabled:hover:bg-red-muted-light h-full p-3 enabled:cursor-pointer enabled:active:brightness-106 disabled:opacity-70"
        onClick={handleSub}
        disabled={quantity === 1}
      >
        <Minus size={20} />
      </button>
      <span className="w-8 text-center font-semibold select-none">{quantity}</span>
      <button
        className="enabled:hover:bg-red-muted-light h-full p-3 enabled:cursor-pointer enabled:active:brightness-106"
        onClick={handleAdd}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
