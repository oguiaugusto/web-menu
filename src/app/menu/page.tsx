import { menuItems } from '@/data/menu-items';
import { MenuCard } from './_components/menu-card';
import { TEXT } from '@/constants/text';

const categories = ['Burgers', 'Pizza', 'Drinks', 'Desserts'];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-235 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.menuTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.menuSubtitle}</p>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full border bg-white px-4 py-2 text-sm whitespace-nowrap transition-colors hover:bg-neutral-100"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mx-auto grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {menuItems.map((x) => (
            <MenuCard key={`menu-item-${x.id}`} item={x} />
          ))}
        </div>
      </div>
    </main>
  );
}
