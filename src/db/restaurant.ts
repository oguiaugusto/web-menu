import { prisma } from '@/lib/prisma';
import { Restaurant as PrismaRestaurant } from '@/generated/prisma/client';

export type Restaurant = Omit<PrismaRestaurant, 'deliveryFee'> & {
  deliveryFee: number | null;
};

export type PublicRestaurant = {
  id: string;
  name: string;
  slug: string;
  deliveryFee: number | null;
  openingHours: string | null;
  contact: string | null;
  open: boolean;
};

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) return null;

  return {
    ...restaurant,
    deliveryFee: restaurant.deliveryFee?.toNumber() ?? null,
  };
}
