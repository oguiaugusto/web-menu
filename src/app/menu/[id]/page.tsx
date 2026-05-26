import { BackButton } from '@/components/back-button';
import { TEXT } from '@/constants/text';
import { menuItems } from '@/data/menu-items';
import { notFound } from 'next/navigation';
import { QuantitySelector } from './_components/quantity-selector';
import { QuantityAndAdd } from './_components/quantity-and-add';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MenuItem({ params }: Props) {
  const { id } = await params;

  const data = menuItems.find((x) => String(x.id) === id);

  if (!data) notFound();

  return (
    <main className="relative min-h-screen bg-neutral-50 pb-24">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="aspect-square w-full bg-neutral-700 sm:h-[420px] sm:rounded-b-3xl" />
        <div className="space-y-3 px-4 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{data.description}</p>
            </div>
            <span className="shrink-0 text-lg font-semibold">${data.price}</span>
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur">
        <QuantityAndAdd price={data.price} />
      </div>
    </main>
  );
}
