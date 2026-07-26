import { MenuCard } from './_components/menu-card';
import { TEXT } from '@/constants/text';
import { Categories } from './_components/categories';
import { getMenuCategories, getMenuItems } from '@/db/menu-item';
import { getRestaurant } from '@/lib/restaurant';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { category } = await searchParams;

  const restaurant = await getRestaurant(slug);
  const [categories, data] = await Promise.all([
    getMenuCategories(restaurant.id),
    getMenuItems(restaurant.id, category),
  ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.menuTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.menuSubtitle}</p>
        </div>
        <Categories slug={slug} categories={categories} selected={category} />
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((x) => (
            <MenuCard key={`menu-item-${x.id}`} slug={slug} item={x} />
          ))}
        </div>
      </div>
    </main>
  );
}
