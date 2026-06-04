'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/constants/text';
import { Radio } from '@/components/ui/radio';

const DEFAULT_FIELDS = {
  name: '',
  phone: '',
  notes: '',
  address: '',
  payment: '',
  changeFor: 0,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();

  const [fields, setFields] = useState<typeof DEFAULT_FIELDS>(DEFAULT_FIELDS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const formatter = new Intl.NumberFormat(TEXT.languageCountryISO, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    const number = Number(digits) / 100;

    setFields((p) => ({ ...p, [e.target.name]: number.toFixed(2) }));
  };

  useEffect(() => {
    setFields((p) => ({ ...p, changeFor: 0 }));
  }, [fields.payment]);

  console.log(JSON.stringify(fields, null, 2));

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{TEXT.checkout}</h1>
        <p className="text-sm text-neutral-500">{TEXT.checkoutSubtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <Input
            name="name"
            value={fields.name}
            label={TEXT.name}
            placeholder={TEXT.yourName}
            onChange={handleChange}
          />
          <Input
            name="phone"
            value={fields.phone}
            label={TEXT.phone}
            placeholder={TEXT.yourPhoneNumber}
            onChange={handleChange}
          />
          <TextArea
            name="notes"
            value={fields.notes}
            label={TEXT.notes}
            placeholder={TEXT.extraInstructions}
            onChange={handleChange}
            rows={4}
          />
          <Input
            name="address"
            value={fields.address}
            label={TEXT.address}
            placeholder={TEXT.yourAddress}
            onChange={handleChange}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium">{TEXT.paymentMethod}</label>
            <div className="w-fit">
              <Radio name="payment" label={TEXT.cash} value="cash" checked={fields.payment} onChange={handleChange} />
              <Radio name="payment" label={TEXT.card} value="card" checked={fields.payment} onChange={handleChange} />
            </div>
            {fields.payment === 'cash' ? (
              <div className="max-w-50">
                <Input
                  type="number"
                  name="changeFor"
                  prefix={TEXT.currency}
                  value={formatter.format(fields.changeFor)}
                  label={TEXT.changeFor}
                  placeholder={TEXT.startingMoney}
                  onChange={handleMoneyChange}
                />
              </div>
            ) : null}
          </div>
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
                  <span>{TEXT.currency}{(item.price * item.quantity).toFixed(2)}</span>
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
              <span>{TEXT.currency}{total.toFixed(2)}</span>
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
