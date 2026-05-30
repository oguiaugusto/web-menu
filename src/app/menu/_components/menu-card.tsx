import Link from 'next/link';
import { MenuItem } from '@/data/menu-items';

type Props = {
  item: MenuItem;
};

export function MenuCard({ item }: Props) {
  return (
    <Link href={`/menu/${item.id}`}>
      <div className="group grid grid-cols-[100px_1fr] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md sm:grid-cols-none">
        <div className="relative h-full overflow-hidden bg-neutral-700 sm:aspect-square">
          <img src="/example-image.png" alt="" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_55%,_rgba(0,0,0,0.45)_100%)]" />
        </div>
        <div className="flex flex-col justify-between gap-2 p-3">
          <div>
            <h2 className="line-clamp-1 font-medium">{item.name}</h2>
            <p className="line-clamp-1 text-sm text-neutral-500">
              {item.description ? item.description : <span className="opacity-0">-</span>}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">${item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
