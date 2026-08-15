import { TEXT } from '@/constants/text';
import { CopyCode } from './_components/copy-code';
import { getOrder } from '@/db/order';
import { notFound } from 'next/navigation';
import { OrderStatus } from './_components/order-status';
import { RememberOrder } from './_components/remember-order';
import { getRestaurant } from '@/lib/restaurant';
import { Metadata } from 'next';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import { formatCurrency } from '@/utils/money';
import { formatOrderDate } from '@/utils/format-order-date';

type Props = {
  params: Promise<{ slug: string; code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, code } = await params;

  const restaurant = await getRestaurant(slug);
  const data = await getOrder(restaurant.id, code);

  return mountPageMetadata(restaurant.name, data ? `${TEXT.order} ${data.code}` : TEXT.orderNotFound);
}

export default async function OrderPage({ params }: Props) {
  const { slug, code } = await params;

  const restaurant = await getRestaurant(slug);
  const data = await getOrder(restaurant.id, code);
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
      <RememberOrder code={data.code} />
      <div className="space-y-4">
        <section className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{TEXT.order}</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {`${TEXT.placedOn} ${formatOrderDate(data.createdAt, restaurant.language)}`}
            </p>
          </div>
          <CopyCode code={data.code} />
        </section>
        <OrderStatus slug={slug} code={code} status={data.status} />
        <div className="flex flex-col gap-4 md:flex-row">
          <section className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 font-semibold">{TEXT.orderSummary}</h2>
            <div className="space-y-2">
              {data.items.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity, restaurant.currency)}</span>
                </div>
              ))}
            </div>
            <div className="my-4 border-t border-neutral-200" />
            <div className="mb-2 flex justify-between text-sm">
              <span>{TEXT.deliveryFee}</span>
              <span>{formatCurrency(data.deliveryFee ?? 0, restaurant.currency)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>{TEXT.total}</span>
              <span>{formatCurrency(data.total, restaurant.currency)}</span>
            </div>
          </section>
          <section className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6">
            <div>
              <h2 className="font-semibold">{TEXT.delivery}</h2>
              <p className="mt-2 text-sm text-neutral-500">{data.deliveryAddress}</p>
            </div>
            <div className="mt-6">
              <h2 className="font-semibold">{TEXT.payment}</h2>
              <p className="mt-2 text-sm text-neutral-500">
                {data.payment}
                {data.changeFor
                  ? ` (${TEXT.changeFor.toLowerCase()} ${formatCurrency(data.changeFor, restaurant.currency)})`
                  : ''}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
