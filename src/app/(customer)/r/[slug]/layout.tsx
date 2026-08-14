import { Header } from '@/app/(customer)/r/[slug]/_components/header';
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
        {children}
      </CartProvider>
    </RestaurantProvider>
  );
}
