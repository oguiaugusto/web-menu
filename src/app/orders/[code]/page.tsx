import { cn } from '@/utils/cn';
import { TEXT } from '@/constants/text';
import { DELIVERY_FEE } from '@/constants/deliveryFee';
import { Fragment } from 'react/jsx-runtime';
import { CopyCode } from './_components/copy-code';
import type { OrderStatus } from '@/generated/prisma/enums';
import { getOrder } from '@/db/order';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    code: string;
  }>;
};

export const STATUS_INFO: Record<OrderStatus, { label: string; description: string }> = {
  PENDING: {
    label: TEXT.statusLabelPending,
    description: TEXT.statusDescriptionPending,
  },
  ACCEPTED: {
    label: TEXT.statusLabelAccepted,
    description: TEXT.statusDescriptionAccepted,
  },
  PREPARING: {
    label: TEXT.statusLabelPreparing,
    description: TEXT.statusDescriptionPreparing,
  },
  READY: {
    label: TEXT.statusLabelReady,
    description: TEXT.statusDescriptionReady,
  },
  DELIVERED: {
    label: TEXT.statusLabelDelivered,
    description: TEXT.statusDescriptionDelivered,
  },
  CANCELLED: {
    label: TEXT.statusLabelCancelled,
    description: TEXT.statusDescriptionCancelled,
  },
} as const;

const ORDER_STEPS: OrderStatus[] = ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'DELIVERED'] as const;

export default async function OrderPage({ params }: Props) {
  const { code } = await params;

  const data = await getOrder(code);
  if (!data) notFound();

  const date = new Date(data.createdAt).toLocaleString();

  const status = STATUS_INFO[data.status];
  const currentStepIndex = ORDER_STEPS.indexOf(data.status as any);

  const renderSteps = () => {
    return (
      <div className="mx-auto flex sm:w-[80%] items-center gap-2">
        {ORDER_STEPS.map((step, index) => (
          <Fragment key={step}>
            <div
              className={cn('h-3 w-3 rounded-full', index <= currentStepIndex ? 'bg-red-muted' : 'bg-neutral-200')}
            />
            {index < ORDER_STEPS.length - 1 ? (
              <div
                className={cn('h-1 flex-1 rounded-full', index < currentStepIndex ? 'bg-red-muted' : 'bg-neutral-200')}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
      <div className="space-y-4">
        <section className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{TEXT.order}</h1>
            <p className="mt-1 text-sm text-neutral-500">{`${TEXT.placedOn} ${date}`}</p>
          </div>
          <CopyCode code={data.code} />
        </section>
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="mb-4 text-center">
            <p className="text-sm text-neutral-500">{TEXT.currentStatus}</p>
            <p className="text-red-muted mt-2 text-lg font-semibold">{status.label}</p>
            <p className="mt-1 text-sm text-neutral-500">{status.description}</p>
          </div>
          {data.status !== 'CANCELLED' ? renderSteps() : null}
        </section>
        <div className="flex flex-col gap-4 md:flex-row">
          <section className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 font-semibold">{TEXT.orderSummary}</h2>
            <div className="space-y-2">
              {data.items.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
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
            <div className="my-4 border-t border-neutral-200" />
            <div className="mb-2 flex justify-between text-sm">
              <span>{TEXT.deliveryFee}</span>
              <span>
                {TEXT.currency}
                {DELIVERY_FEE.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>{TEXT.total}</span>
              <span>
                {TEXT.currency}
                {data.total.toFixed(2)}
              </span>
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
                {data.changeFor ? ` (change for ${TEXT.currency}${data.changeFor})` : ''}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
