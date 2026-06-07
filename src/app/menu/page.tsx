import { MenuCard } from './_components/menu-card';
import { TEXT } from '@/constants/text';
import { Categories } from './_components/categories';
import { getMenuItems } from '@/db/menu-item';

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MenuPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const data = await getMenuItems(category);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-235 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.menuTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.menuSubtitle}</p>
        </div>
        <Categories selected={category} />
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((x) => (
            <MenuCard key={`menu-item-${x.id}`} item={x} />
          ))}
        </div>
      </div>
    </main>
  );
}
