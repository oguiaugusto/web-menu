'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { TEXT } from '@/constants/text';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/db/menu-item';
import { toastSuccess } from '@/utils/toast';

type Props = {
  data: MenuItem;
};

export function QuantityAndAdd({ data }: Props) {
  const router = useRouter();

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem({ id: data.id, name: data.name, price: data.price, imageUrl: data.imageUrl }, quantity);
    setQuantity(1);

    toastSuccess(`${quantity}x ${data.name} ${TEXT.addedToCart}`, {
      action: { label: TEXT.browseMoreItems, onClick: () => router.push('/menu') },
      style: { marginBottom: '70px' },
      position: 'bottom-center',
    });
  };

  return (
    <div className="mx-auto flex max-w-4xl justify-between gap-4">
      <div className="bg-red-muted flex items-center overflow-hidden rounded-lg text-white">
        <button
          className="enabled:hover:bg-red-muted-light h-full p-3 enabled:cursor-pointer enabled:active:brightness-106 disabled:opacity-70"
          onClick={() => setQuantity((p) => (p > 1 ? p - 1 : p))}
          disabled={quantity === 1}
        >
          <Minus size={20} />
        </button>
        <span className="w-8 text-center font-semibold select-none">{quantity}</span>
        <button
          className="enabled:hover:bg-red-muted-light h-full p-3 enabled:cursor-pointer enabled:active:brightness-106"
          onClick={() => setQuantity((p) => p + 1)}
        >
          <Plus size={20} />
        </button>
      </div>
      <Button variant="primary" className="flex max-w-60 flex-1 items-center justify-between" onClick={handleAdd}>
        <span>{TEXT.add}</span>
        <span>
          {TEXT.currency}
          {data.price * quantity}
        </span>
      </Button>
    </div>
  );
}
