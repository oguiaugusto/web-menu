'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ERROR_MESSAGES, TEXT } from '@/constants/text';
import { OrderSummary } from '@/db/order';
import { getOrderCodes } from '@/utils/localstorage-orders';
import { OrderCard } from './order-card';
import { useRouter } from 'next/navigation';
import { toastError } from '@/utils/toast';
import { rSlug } from '@/utils/r-slug';

type Props = Readonly<{
  slug: string;
}>;

export default function OrdersContent({ slug }: Props) {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [orders, setOrders] = useState<OrderSummary[] | null>(null);

  useEffect(() => {
    const codes = getOrderCodes();

    const fetchOrders = async () => {
      const query = codes.map((x) => `codes=${x}`).join('&');
      const response = await fetch(`/api/r/${slug}/orders/summaries?${query}`);

      if (!response.ok) {
        setOrders([]);
        return;
      }

      const data = (await response.json()) as OrderSummary[];
      setOrders(data);
    };

    fetchOrders();
  }, [slug]);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code.toUpperCase().startsWith('WM-') || code.length !== 9) {
      toastError(ERROR_MESSAGES.invalid_code, { position: 'top-center' });
    } else {
      router.push(rSlug(slug, `/orders/${code.toUpperCase()}`));
    }
  };

  const renderOrders = () => {
    if (orders === null) {
      return (
        <section>
          <h2 className="mb-4 text-lg font-semibold">{TEXT.recentOrders}</h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="animate-pulse rounded-xl border border-neutral-200 bg-white p-4">
                <div className="mb-3 h-5 w-28 rounded bg-neutral-200" />
                <div className="h-4 w-40 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (orders.length) {
      return (
        <section>
          <h2 className="mb-4 text-lg font-semibold">{TEXT.recentOrders}</h2>
          <div className="space-y-3">
            {orders?.map((x) => (
              <OrderCard key={x.code} slug={slug} order={x} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="mt-4 text-center">
        <h2 className="text-lg font-semibold">{TEXT.noRecentOrders}</h2>
        <h3 className="text-md text-neutral-500">{TEXT.noRecentOrdersSubtitle}</h3>
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.ordersTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.ordersSubtitle}</p>
        </div>
        <form className="mb-8 flex gap-2" onSubmit={handleSearch}>
          <div className="flex-1">
            <Input
              label=""
              placeholder="WM-XXXXXX"
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 9).toUpperCase())}
            />
          </div>
          <Button type="submit" variant="primary" disabled={code.length !== 9}>
            {TEXT.search}
          </Button>
        </form>
        {renderOrders()}
      </div>
    </main>
  );
}
