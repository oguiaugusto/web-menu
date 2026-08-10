import { requireCurrentUser } from '@/lib/auth/user';
import { RestaurantSettingsForm } from './_components/restaurant-settings-form';

export default async function RestaurantSettingsPage() {
  const user = await requireCurrentUser();

  return <RestaurantSettingsForm restaurant={user.restaurant} email={user.email} />;
}
