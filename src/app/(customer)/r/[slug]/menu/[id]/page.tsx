import { notFound } from 'next/navigation';
import { QuantityAndAdd } from './_components/quantity-and-add';
import { TEXT } from '@/constants/text';
import { getMenuItem } from '@/db/menu-item';
import Image from 'next/image';
import { getRestaurant } from '@/lib/restaurant';

type Props = {
  params: Promise<{ slug: string; id: string }>;
};

export default async function MenuItem({ params }: Props) {
  const { slug, id } = await params;
  const restaurant = await getRestaurant(slug);

  const data = await getMenuItem(restaurant.id, id);
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
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 whitespace-pre">{data.description}</p>
            </div>
            <span className="shrink-0 text-lg font-semibold">
              {TEXT.currency}
              {data.price}
            </span>
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur">
        <QuantityAndAdd slug={slug} data={data} />
      </div>
    </main>
  );
}
