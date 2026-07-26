'use client';

import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { TEXT } from '@/constants/text';
import { cn } from '@/utils/cn';
import { STATUS_INFO } from '../../_constants/status';
import type { OrderStatus as POrderStatus } from '@/generated/prisma/enums';

type Props = { slug: string; code: string; status: POrderStatus };

const ORDER_STEPS: POrderStatus[] = ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'DELIVERED'] as const;

export function OrderStatus({ slug, code, status }: Props) {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusInfo = STATUS_INFO[currentStatus];
  const currentStepIndex = ORDER_STEPS.indexOf(currentStatus);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval: NodeJS.Timeout;

    const refresh = async () => {
      const response = await fetch(`/api/r/${slug}/orders/${code}/status`);

      if (!response.ok) return;

      const data = (await response.json()) as { status: POrderStatus };

      setCurrentStatus(data.status);

      if (['DELIVERED', 'CANCELLED'].includes(data.status)) {
        clearInterval(interval);
      }
    };

    refresh();

    interval = setInterval(refresh, 15000);

    return () => clearInterval(interval);
  }, [code, slug]);

  const renderSteps = () => {
    return (
      <div className="mx-auto mt-4 flex items-center gap-2 sm:w-[80%] sm:pb-4">
        {ORDER_STEPS.map((step, index) => (
          <Fragment key={step}>
            <div
              className={cn(
                'relative h-3 w-3 rounded-full',
                index <= currentStepIndex ? 'bg-red-muted' : 'bg-neutral-200',
              )}
            >
              <div
                className={cn(
                  'absolute top-4 left-1/2 hidden -translate-x-1/2 text-xs sm:block',
                  index <= currentStepIndex ? 'text-red-muted' : 'text-neutral-500',
                )}
              >
                {STATUS_INFO[step].label}
              </div>
            </div>
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
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="text-center">
        <p className="text-sm text-neutral-500">{TEXT.currentStatus}</p>
        <p className="text-red-muted mt-2 text-lg font-semibold">{statusInfo?.label}</p>
        <p className="mt-1 text-sm text-neutral-500">{statusInfo?.description}</p>
      </div>
      {currentStatus !== 'CANCELLED' ? renderSteps() : null}
    </section>
  );
}
