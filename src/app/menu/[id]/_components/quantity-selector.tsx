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
    <div className="bg-red-muted flex items-center rounded-xl text-white overflow-hidden">
      <button
        className="cursor-pointer p-3 h-full hover:bg-red-muted-light disabled:opacity-70 hover:disabled:drop-shadow-none"
        onClick={handleSub}
        disabled={quantity === 1}
      >
        <Minus size={20} />
      </button>
      <span className="w-8 text-center font-semibold select-none">{quantity}</span>
      <button className="cursor-pointer h-full p-3 hover:bg-red-muted-light" onClick={handleAdd}>
        <Plus size={20} className="" />
      </button>
    </div>
  );
}
