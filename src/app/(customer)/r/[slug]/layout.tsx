import { Header } from '@/app/(customer)/r/[slug]/_components/header';
import { CustomerBottomNav } from '@/app/(customer)/r/[slug]/_components/customer-bottom-nav';
import { getRestaurant } from '@/lib/restaurant';
import { CartProvider } from '@/providers/cart-provider';
import { RestaurantProvider } from '@/providers/restaurant-provider';

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export default async function RestaurantLayout({ children, params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);

  return (
    <RestaurantProvider restaurant={restaurant}>
      <CartProvider slug={slug}>
        <Header slug={slug} />
        <div className="pb-[calc(4rem_+_env(safe-area-inset-bottom))] sm:pb-0">{children}</div>
        <CustomerBottomNav slug={slug} />
      </CartProvider>
    </RestaurantProvider>
  );
}
