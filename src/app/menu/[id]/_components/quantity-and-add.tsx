'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { TEXT } from '@/constants/text';
import { QuantitySelector } from './quantity-selector';
import { useCart } from '@/providers/cart-provider';
import { MenuItem } from '@/data/menu-items';
import { Button } from '@/components/button';
import { inter } from '@/constants/fonts';

type Props = {
  data: MenuItem;
};

export function QuantityAndAdd({ data }: Props) {
  const router = useRouter();

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem({ id: data.id, name: data.name, price: data.price }, quantity);
    setQuantity(1);

    toast.success(`${quantity}x ${data.name} ${TEXT.addedToCart}`, {
      action: { label: 'Browse more items', onClick: () => router.push('/menu') },
      duration: 4000,
      position: 'bottom-center',
      className: `${inter.className}`,
      classNames: {
        success: '!bg-red-muted !text-white',
        icon: 'text-white',
        actionButton: '!bg-white !text-red-muted',
      },
    });
  };

  return (
    <div className="mx-auto flex max-w-235 justify-between gap-4">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        variant="primary"
        className="flex max-w-60 flex-1 items-center justify-between"
        onClick={handleAdd}
      >
        <span>{TEXT.add}</span>
        <span>${data.price * quantity}</span>
      </Button>
    </div>
  );
}
