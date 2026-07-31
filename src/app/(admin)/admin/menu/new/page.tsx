import { MenuItemForm } from '@/app/(admin)/_components/menu-item-form';
import { getMenuCategories } from '@/db/menu-item';
import { getCurrentUser } from '@/lib/auth/user';

export default async function MenuItemNewPage() {
  const user = await getCurrentUser();
  const categories = user ? await getMenuCategories(user.restaurant.id) : [];

  return <MenuItemForm mode="create" categories={categories} />;
}
