'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Radio } from '@/components/ui/radio';
import { createOrder, UnavailableItem } from '@/actions/orders';
import { FieldErrors } from '@/types/misc';
import { toastSuccess } from '@/utils/toast';
import { saveOrderCode } from '@/utils/localstorage-orders';
import EmptyCart from '@/app/(customer)/_components/empty-cart';
import { getHandleChange } from '@/utils/getHandleChange';
import { rSlug } from '@/utils/r-slug';
import { useRestaurant } from '@/providers/restaurant-provider';
import { formatCurrency, formatMoneyInput, getCurrencySymbol, getMoneyFormatter } from '@/utils/money';
import { handleSubmitError } from '@/utils/handle-submit-error';
import RequiredStar from '@/components/required-star';
import { ClosedBanner } from '@/app/(customer)/_components/closed-banner';
import { useRestaurantOpen } from '@/app/(customer)/_hooks/useRestaurantOpen';
import { ErrorCode } from '@/types/enums';
import { ClosedDialog } from './closed-dialog';
import { UnavailableDialog } from './unavailable-dialog';
import { PaymentMethod } from '@/generated/prisma/enums';

type Props = Readonly<{
  slug: string;
}>;

const DEFAULT_FIELDS = {
  name: '',
  phone: '',
  notes: '',
  address: '',
  payment: '',
  changeFor: 0,
};

export default function CheckoutContent({ slug }: Props) {
  const router = useRouter();
  const restaurant = useRestaurant();
  const { text: TEXT, errorMessages, paymentMethods } = restaurant;
  const { items, subtotal, clearCart } = useCart();

  const isOpen = useRestaurantOpen(slug);
  const [isClosedDialogOpen, setIsClosedDialogOpen] = useState(false);

  const [unavailableItems, setUnavailableItems] = useState<UnavailableItem[]>([]);
  const [unavailableDialogOpen, setUnavailableDialogOpen] = useState(false);

  const [fields, setFields] = useState<typeof DEFAULT_FIELDS>(DEFAULT_FIELDS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = getHandleChange(setFields, setFieldErrors);
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: formatMoneyInput(e.target.value) }));
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
      const result = await createOrder(restaurant.id, {
        name: fields.name,
        phone: fields.phone,
        address: fields.address,
        notes: fields.notes,
        payment: fields.payment as PaymentMethod,
        changeFor: Number(fields.changeFor) > 0 ? Number(fields.changeFor) : undefined,
        items: items.map((x) => ({ id: x.id, quantity: x.quantity })),
      });

      if (!result.success) {
        if (result.error === ErrorCode.UNAVAILABLE_ITEMS) {
          setUnavailableDialogOpen(true);
          setUnavailableItems(result.unavailableItems);
          return;
        }

        if (result.error.form === ErrorCode.RESTAURANT_CLOSED) {
          setIsClosedDialogOpen(true);
          return;
        }

        return handleSubmitError(result, setFieldErrors, errorMessages);
      }

      toastSuccess(TEXT.orderPlaced, { position: 'bottom-center' });
      saveOrderCode(result.code);
      clearCart();

      router.replace(rSlug(slug, `/orders/${result.code}`));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) return <EmptyCart slug={slug} />;

  return (
    <>
      <ClosedDialog isOpen={isClosedDialogOpen} slug={slug} />
      <UnavailableDialog
        isOpen={unavailableDialogOpen}
        setIsOpen={setUnavailableDialogOpen}
        slug={slug}
        items={unavailableItems}
      />
      <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0 lg:pb-16">
        {isOpen === false ? <ClosedBanner>{TEXT.orderCannotBePlaced}</ClosedBanner> : null}
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
              errorMessages={errorMessages}
              onChange={handleChange}
              required
              showRequired
            />
            <Input
              name="phone"
              value={fields.phone}
              label={TEXT.phone}
              placeholder={TEXT.yourPhoneNumber}
              error={fieldErrors.phone}
              errorMessages={errorMessages}
              onChange={handleChange}
              required
              showRequired
            />
            <Input
              name="address"
              value={fields.address}
              label={TEXT.addressLabel}
              placeholder={TEXT.yourAddress}
              error={fieldErrors.address}
              errorMessages={errorMessages}
              onChange={handleChange}
              required
              showRequired
            />
            <TextArea
              name="notes"
              value={fields.notes}
              label={TEXT.notes}
              placeholder={TEXT.extraInstructions}
              error={fieldErrors.notes}
              errorMessages={errorMessages}
              onChange={handleChange}
              rows={4}
            />
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium">
                {TEXT.paymentMethod}
                <RequiredStar required />
              </label>
              <div className="w-fit">
                <Radio
                  name="payment"
                  label={paymentMethods.CASH}
                  value="CASH"
                  checked={fields.payment}
                  onChange={handleChange}
                />
                <Radio
                  name="payment"
                  label={paymentMethods.CARD}
                  value="CARD"
                  checked={fields.payment}
                  onChange={handleChange}
                />
                {fieldErrors.payment ? (
                  <p className="text-sm text-red-600">{errorMessages[fieldErrors.payment]}</p>
                ) : null}
              </div>
              {fields.payment === 'CASH' ? (
                <div className="space-y-1">
                  <div className="max-w-50">
                    <Input
                      type="text"
                      name="changeFor"
                      prefix={{ value: getCurrencySymbol(restaurant.currency) }}
                      value={getMoneyFormatter(restaurant.currency).format(fields.changeFor)}
                      label={TEXT.needChangeFor}
                      placeholder={getMoneyFormatter(restaurant.currency).format(0)}
                      onChange={handleMoneyChange}
                      errorMessages={errorMessages}
                    />
                  </div>
                  {fieldErrors.changeFor ? (
                    <p className="text-sm text-red-600">{errorMessages[fieldErrors.changeFor]}</p>
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
                    <span>{formatCurrency(item.price * item.quantity, restaurant.currency)}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="primary-text"
                className="ms-auto mt-2 text-end text-sm"
                onClick={() => router.replace(rSlug(slug, '/cart'))}
              >
                {TEXT.editCart}
              </Button>
              <div className="my-4 border-t border-neutral-200" />
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>{TEXT.subtotal}</span>
                    <span>{formatCurrency(subtotal, restaurant.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{TEXT.deliveryFee}</span>
                    <span>{formatCurrency(restaurant.deliveryFee ?? 0, restaurant.currency)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>{TEXT.total}</span>
                  <span>{formatCurrency(subtotal + (restaurant.deliveryFee ?? 0), restaurant.currency)}</span>
                </div>
              </div>
            </div>
            {isOpen ? (
              <Button variant="primary" type="submit" className="w-full" disabled={isSubmitting}>
                {TEXT.placeOrder}
              </Button>
            ) : null}
          </aside>
        </form>
      </main>
    </>
  );
}
