import { notFound } from 'next/navigation';
import { menuItems } from '@/data/menu-items';
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
      <div className="mx-auto max-w-3xl">
        <div className="relative h-72 w-full overflow-hidden bg-neutral-700 sm:h-[420px] sm:rounded-b-3xl">
          <img src="/example-image.png" alt="" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.45)_100%)]" />
        </div>
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
        <QuantityAndAdd data={data} />
      </div>
    </main>
  );
}
