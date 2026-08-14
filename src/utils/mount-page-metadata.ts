import { getCurrentUser } from '@/lib/auth/user';
import { getRestaurant } from '@/lib/restaurant';
import { Metadata } from 'next';

export function mountPageMetadata(brand: string, keyword?: string): Metadata {
  return { title: keyword ? `${keyword} | ${brand}` : brand };
}

export async function mountAdminPageMetadata(keyword: string): Promise<Metadata> {
  const user = await getCurrentUser();

  if (!user) return mountPageMetadata('Web Menu');
  return mountPageMetadata(user.restaurant.name, keyword);
}

export async function mountCustomerPageMetadata(slug: string, keyword: string): Promise<Metadata> {
  const restaurant = await getRestaurant(slug);
  return mountPageMetadata(restaurant.name, keyword);
}
