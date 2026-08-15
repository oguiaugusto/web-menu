'use client';

import { useRestaurant } from '@/providers/restaurant-provider';
import { Button } from '../../../components/ui/button';
import { rSlug } from '@/utils/r-slug';
import Link from 'next/link';

export default function EmptyCart({ slug }: { slug: string }) {
  const { text: TEXT } = useRestaurant();
  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl flex-col items-center justify-center px-6 pb-12 text-center">
      <h1 className="text-2xl font-bold">{TEXT.emptyCart}</h1>
      <p className="mt-2 text-neutral-500">{TEXT.emptyCartSubtitle}</p>
      <Button as={Link} variant="primary" className="mt-6" href={rSlug(slug, '/menu')}>
        {TEXT.browseMenu}
      </Button>
    </main>
  );
}
