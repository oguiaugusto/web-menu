'use client';

import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{TEXT.checkout}</h1>
        <p className="text-sm text-neutral-500">{TEXT.checkoutSubtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <Input label={TEXT.name} placeholder={TEXT.yourName} />
          <Input label={TEXT.phone} placeholder={TEXT.yourPhoneNumber} />
          <TextArea label={TEXT.notes} placeholder={TEXT.extraInstructions} rows={4} />
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h2 className="mb-3 font-semibold">{TEXT.orderSummary}</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Button
              variant="primary-text"
              className="mt-2 w-full text-end text-sm"
              onClick={() => router.push('/cart')}
            >
              {TEXT.editCart}
            </Button>
            <div className="my-4 border-t border-neutral-200" />
            <div className="flex justify-between font-semibold">
              <span>{TEXT.total}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button variant="primary" className="w-full">
            {TEXT.placeOrder}
          </Button>
        </aside>
      </div>
    </main>
  );
}
