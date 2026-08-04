import { MenuItemForm } from '../_components/menu-item-form';
import { getMenuCategories } from '@/db/menu-item';
import { requireCurrentUser } from '@/lib/auth/user';

export default async function MenuItemNewPage() {
  const user = await requireCurrentUser();
  const categories = await getMenuCategories(user.restaurant.id);

  return <MenuItemForm mode="create" categories={categories} />;
}
