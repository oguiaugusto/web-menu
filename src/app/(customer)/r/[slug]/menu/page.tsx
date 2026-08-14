import { MenuCard } from './_components/menu-card';
import { TEXT } from '@/constants/text';
import { Categories } from './_components/categories';
import { getMenuCategories, getMenuItems } from '@/db/menu-item';
import { getRestaurant } from '@/lib/restaurant';
import { ClosedBanner } from '@/app/(customer)/_components/closed-banner';
import { RestaurantInfo } from './_components/restaurant-info';
import { Metadata } from 'next';
import { mountCustomerPageMetadata } from '@/utils/mount-page-metadata';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await searchParams;

  return mountCustomerPageMetadata(slug, category ?? '');
}

export default async function MenuPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { category } = await searchParams;

  const restaurant = await getRestaurant(slug);
  const [categories, data] = await Promise.all([
    getMenuCategories(restaurant.id, true),
    getMenuItems(restaurant.id, category),
  ]);

  return (
    <main className="relative min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
        {!restaurant.open ? <ClosedBanner>{TEXT.notAcceptingOrders}</ClosedBanner> : null}
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">{TEXT.menuTitle}</h1>
          <p className="mt-1 text-sm text-neutral-500">{TEXT.menuSubtitle}</p>
        </div>
        <RestaurantInfo
          deliveryFee={restaurant.deliveryFee}
          openingHours={restaurant.openingHours}
          contact={restaurant.contact}
        />
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
