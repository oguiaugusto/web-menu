import { MenuItemForm } from '@/app/(admin)/_components/menu-item-form';
import { getMenuCategories, getMenuItem } from '@/db/menu-item';
import { getCurrentUser } from '@/lib/auth/user';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MenuItemEditPage({ params }: Props) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const categories = await getMenuCategories(user.restaurant.id);

  const item = await getMenuItem(user.restaurant.id, id);
  if (!item) notFound();

  return <MenuItemForm mode="edit" categories={categories} item={item} />;
}
