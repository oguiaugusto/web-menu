'use client';

import { use, useEffect, useState } from 'react';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { Radio } from '@/components/ui/radio';
import { createOrder } from '@/actions/orders';
import { FieldErrors } from '@/types/misc';
import { toastError, toastSuccess } from '@/utils/toast';
import { saveOrderCode } from '@/utils/localstorage-orders';
import EmptyCart from '@/components/empty-cart';
import { getHandleChange } from '@/utils/getHandleChange';
import { rSlug } from '@/utils/r-slug';
import { useRestaurant } from '@/providers/restaurant-provider';

type Props = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_FIELDS = {
  name: '',
  phone: '',
  notes: '',
  address: '',
  payment: '',
  changeFor: 0,
};

export default function CheckoutPage({ params }: Props) {
  const { slug } = use(params);

  const router = useRouter();
  const restaurant = useRestaurant();
  const { items, subtotal, clearCart } = useCart();

  const [fields, setFields] = useState<typeof DEFAULT_FIELDS>(DEFAULT_FIELDS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = getHandleChange(setFields, setFieldErrors);

  const formatter = new Intl.NumberFormat(TEXT.languageCountryISO, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    const number = Number(digits) / 100;

    setFields((p) => ({ ...p, [e.target.name]: number.toFixed(2) }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next[e.target.name];
      return next;
    });
  };

  useEffect(() => {
    setFields((p) => ({ ...p, changeFor: 0 }));
  }, [fields.payment]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createOrder({
        name: fields.name,
        phone: fields.phone,
        address: fields.address,
        notes: fields.notes,
        payment: fields.payment as any,
        changeFor: fields.changeFor > 0 ? Number(fields.changeFor) : undefined,
        items: items.map((x) => ({ id: x.id, quantity: x.quantity })),
      });

      if (!result.success) {
        if (result.error.form) {
          toastError(ERROR_MESSAGES[result.error.form], { position: 'top-center' });
        } else if (result.error.fields) {
          setFieldErrors(result.error.fields);
        }

        return;
      }

      toastSuccess(TEXT.orderPlaced, { position: 'bottom-center' });
      saveOrderCode(result.code);
      clearCart();

      router.push(rSlug(slug, `/orders/${result.code}`));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) return <EmptyCart slug={slug} />;

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0 lg:pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{TEXT.checkout}</h1>
        <p className="text-sm text-neutral-500">{TEXT.checkoutSubtitle}</p>
      </div>
      <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={handleSubmit}>
        <section className="space-y-4">
          <Input
            name="name"
            value={fields.name}
            label={TEXT.name}
            placeholder={TEXT.yourName}
            error={fieldErrors.name}
            onChange={handleChange}
          />
          <Input
            name="phone"
            value={fields.phone}
            label={TEXT.phone}
            placeholder={TEXT.yourPhoneNumber}
            error={fieldErrors.phone}
            onChange={handleChange}
          />
          <Input
            name="address"
            value={fields.address}
            label={TEXT.addressLabel}
            errorLabel={TEXT.address}
            placeholder={TEXT.yourAddress}
            error={fieldErrors.address}
            onChange={handleChange}
          />
          <TextArea
            name="notes"
            value={fields.notes}
            label={TEXT.notes}
            placeholder={TEXT.extraInstructions}
            error={fieldErrors.notes}
            onChange={handleChange}
            rows={4}
          />
          <div className="space-y-1">
            <label className="text-sm font-medium">{TEXT.paymentMethod}</label>
            <div className="w-fit">
              <Radio name="payment" label={TEXT.cash} value="CASH" checked={fields.payment} onChange={handleChange} />
              <Radio name="payment" label={TEXT.card} value="CARD" checked={fields.payment} onChange={handleChange} />
              {fieldErrors.payment ? (
                <p className="text-sm text-red-600">{`${TEXT.paymentMethod} ${ERROR_MESSAGES[fieldErrors.payment]}`}</p>
              ) : null}
            </div>
            {fields.payment === 'CASH' ? (
              <div className="space-y-1">
                <div className="max-w-50">
                  <Input
                    type="number"
                    name="changeFor"
                    prefix={{ value: TEXT.currency }}
                    value={formatter.format(fields.changeFor)}
                    label={TEXT.changeFor}
                    placeholder={TEXT.startingMoney}
                    onChange={handleMoneyChange}
                  />
                </div>
                {fieldErrors.changeFor ? (
                  <p className="text-sm text-red-600">{`${TEXT.changeFor} ${ERROR_MESSAGES[fieldErrors.changeFor]}`}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h2 className="mb-3 font-semibold">{TEXT.orderSummary}</h2>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>
                    {TEXT.currency}
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant="primary-text"
              className="mt-2 w-full text-end text-sm"
              onClick={() => router.push(rSlug(slug, '/cart'))}
            >
              {TEXT.editCart}
            </Button>
            <div className="my-4 border-t border-neutral-200" />
            <div className="space-y-2">
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>{TEXT.subtotal}</span>
                  <span>
                    {TEXT.currency}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{TEXT.deliveryFee}</span>
                  <span>
                    {TEXT.currency}
                    {(restaurant.deliveryFee ?? 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>{TEXT.total}</span>
                <span>
                  {TEXT.currency}
                  {(subtotal + (restaurant.deliveryFee ?? 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={isSubmitting}>
            {TEXT.placeOrder}
          </Button>
        </aside>
      </form>
    </main>
  );
}
