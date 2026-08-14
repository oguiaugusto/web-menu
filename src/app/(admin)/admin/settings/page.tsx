import { requireCurrentUser } from '@/lib/auth/user';
import { RestaurantSettingsForm } from './_components/restaurant-settings-form';
import { Metadata } from 'next';
import { TEXT } from '@/constants/text';
import { mountAdminPageMetadata } from '@/utils/mount-page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return mountAdminPageMetadata(TEXT.restaurantSettingsTitle);
}

export default async function RestaurantSettingsPage() {
  const user = await requireCurrentUser();

  return <RestaurantSettingsForm restaurant={user.restaurant} email={user.email} />;
}
