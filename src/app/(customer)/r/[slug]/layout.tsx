import { Header } from '@/app/(customer)/r/[slug]/_components/header';
import { getRestaurant } from '@/lib/restaurant';
import { CartProvider } from '@/providers/cart-provider';
import { Metadata, ResolvingMetadata } from 'next';

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: Props, _: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);

  return {
    title: `${restaurant.name} - Web Menu`,
  };
}

export default async function RestaurantLayout({ children, params }: Props) {
  const { slug } = await params;
  await getRestaurant(slug);

  return (
    <CartProvider slug={slug}>
      <Header slug={slug} />
      {children}
    </CartProvider>
  );
}
