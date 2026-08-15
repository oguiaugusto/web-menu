import { MenuItemForm } from '../_components/menu-item-form';
import { getMenuCategories } from '@/db/menu-item';
import { requireCurrentUser } from '@/lib/auth/user';
import { Metadata } from 'next';
import { mountAdminPageMetadata } from '@/utils/mount-page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return mountAdminPageMetadata('menuItemFormTitleNew');
}

export default async function MenuItemNewPage() {
  const user = await requireCurrentUser();
  const categories = await getMenuCategories(user.restaurant.id);

  return <MenuItemForm mode="create" categories={categories} currency={user.restaurant.currency} />;
}
