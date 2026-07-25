'use client';

import { TEXT } from '@/constants/text';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderNotFound() {
  const { code } = useParams<{ code: string }>();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
      <section className="w-full rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{TEXT.orderNotFound}</h1>
        <p className="font-mono text-lg font-semibold">{code}</p>
        <p className="mt-3 text-neutral-500">
          {TEXT.orderNotFoundCheck}
          <Link href="/orders" className="text-red-muted font-medium">{` ${TEXT.orderNotFoundSearch}.`}</Link>
        </p>
      </section>
    </main>
  );
}
