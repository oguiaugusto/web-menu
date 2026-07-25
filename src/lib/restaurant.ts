import { notFound } from 'next/navigation';

import { getRestaurantBySlug } from '@/db/restaurant';

export async function getRestaurant(slug: string) {
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) notFound();
  return restaurant;
}
