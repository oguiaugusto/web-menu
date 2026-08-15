import { notFound } from 'next/navigation';
import { QuantityAndAdd } from './_components/quantity-and-add';
import { TEXT } from '@/constants/text';
import { getMenuItem } from '@/db/menu-item';
import Image from 'next/image';
import { getRestaurant } from '@/lib/restaurant';
import { mountPageMetadata } from '@/utils/mount-page-metadata';
import { Metadata } from 'next';
import { formatCurrency } from '@/utils/money';

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params;

  const restaurant = await getRestaurant(slug);
  const item = await getMenuItem(restaurant.id, id, true);

  return mountPageMetadata(restaurant.name, item?.name ?? TEXT.itemNotFound);
}

export default async function MenuItem({ params }: Props) {
  const { slug, id } = await params;
  const restaurant = await getRestaurant(slug);

  const data = await getMenuItem(restaurant.id, id, true);
  if (!data) notFound();

  return (
    <main className="relative min-h-screen bg-neutral-50 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative h-72 w-full overflow-hidden bg-neutral-700 sm:h-[420px] sm:rounded-b-3xl">
          <Image
            src={data.imageUrl ?? ''}
            alt={data.name}
            className="h-full w-full object-cover"
            sizes="100%"
            unoptimized
            fill
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.45)_100%)]" />
        </div>
        <div className="space-y-3 px-4 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
              <p className="mt-2 text-sm leading-relaxed whitespace-pre text-neutral-500">{data.description}</p>
            </div>
            <span className="shrink-0 text-lg font-semibold">{formatCurrency(data.price, restaurant.currency)}</span>
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-[calc(4rem_+_env(safe-area-inset-bottom))] left-0 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur sm:bottom-0">
        <QuantityAndAdd slug={slug} data={data} />
      </div>
    </main>
  );
}
