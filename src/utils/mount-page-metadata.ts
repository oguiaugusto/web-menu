import { getCurrentUser } from '@/lib/auth/user';
import { getRestaurant } from '@/lib/restaurant';
import { Metadata } from 'next';
import { getText, type TranslationKey } from '@/i18n';

export function mountPageMetadata(brand: string, keyword?: string): Metadata {
  return { title: keyword ? `${keyword} | ${brand}` : brand };
}

export async function mountAdminPageMetadata(keyword: TranslationKey): Promise<Metadata> {
  const user = await getCurrentUser();

  if (!user) return mountPageMetadata('Web Menu');
  return mountPageMetadata(user.restaurant.name, getText(user.restaurant.language)[keyword]);
}

export async function mountCustomerPageMetadata(slug: string, keyword: TranslationKey): Promise<Metadata> {
  const restaurant = await getRestaurant(slug);
  return mountPageMetadata(restaurant.name, getText(restaurant.language)[keyword]);
}
