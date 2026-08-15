'use client';

import { useRestaurant } from '@/providers/restaurant-provider';
import { rSlug } from '@/utils/r-slug';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderNotFound() {
  const { slug, code } = useParams<{ slug: string; code: string }>();
  const { text: TEXT } = useRestaurant();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
      <section className="w-full rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{TEXT.orderNotFound}</h1>
        <p className="font-mono text-lg font-semibold">{code}</p>
        <p className="mt-3 text-neutral-500">
          {TEXT.orderNotFoundCheck}
          <Link
            href={rSlug(slug, '/orders')}
            className="text-red-muted font-medium"
          >{` ${TEXT.orderNotFoundSearch}.`}</Link>
        </p>
      </section>
    </main>
  );
}
