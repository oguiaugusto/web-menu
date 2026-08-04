import { MenuItemForm } from '../../_components/menu-item-form';
import { getMenuCategories, getMenuItem } from '@/db/menu-item';
import { requireCurrentUser } from '@/lib/auth/user';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MenuItemEditPage({ params }: Props) {
  const { id } = await params;

  const user = await requireCurrentUser();

  const categories = await getMenuCategories(user.restaurant.id);

  const item = await getMenuItem(user.restaurant.id, id);
  if (!item) notFound();

  return <MenuItemForm mode="edit" categories={categories} item={item} />;
}
