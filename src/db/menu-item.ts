import { prisma } from '@/lib/prisma';
import type { Prisma, MenuItem as PrismaMenuItem } from '@/generated/prisma/client';
import { requireCurrentUser } from '@/lib/auth/user';

export type MenuItem = Omit<PrismaMenuItem, 'price'> & {
  price: number;
};

type SearchMenuItemsProps = {
  query?: string;
  sortBy?: string;
  order?: string;
};

export async function getMenuCategories(restaurantId: string) {
  const items = await prisma.menuItem.findMany({
    where: { restaurantId },
    distinct: ['category'],
    select: { category: true },
    orderBy: { category: 'asc' },
  });

  return items.map((x) => x.category);
}

export async function getMenuItems(restaurantId: string, category?: string): Promise<MenuItem[]> {
  const items = await prisma.menuItem.findMany({
    where: { restaurantId, category },
    orderBy: { name: 'asc' },
  });

  return items.map((item) => ({
    ...item,
    price: item.price.toNumber(),
  }));
}

export async function getMenuItemsList({
  query,
  sortBy = 'category',
  order = 'asc',
}: SearchMenuItemsProps): Promise<MenuItem[]> {
  const user = await requireCurrentUser();

  const orderDir = order === 'desc' ? 'desc' : 'asc';
  let orderBy: Prisma.MenuItemOrderByWithRelationInput[] = [];

  if (sortBy === 'name') {
    orderBy = [{ name: orderDir }, { category: 'asc' }, { price: 'asc' }];
  } else if (sortBy === 'price') {
    orderBy = [{ price: orderDir }, { category: 'asc' }, { name: 'asc' }];
  } else {
    orderBy = [{ category: orderDir }, { price: 'desc' }, { name: 'asc' }];
  }

  const items = await prisma.menuItem.findMany({
    where: {
      restaurantId: user.restaurant.id,
      name: query ? { contains: query, mode: 'insensitive' } : undefined,
    },
    orderBy: orderBy,
  });

  return items.map((item) => ({
    ...item,
    price: item.price.toNumber(),
  }));
}

export async function getMenuItem(restaurantId: string, id: string): Promise<MenuItem | null> {
  const item = await prisma.menuItem.findUnique({
    where: { restaurantId, id },
  });

  if (!item) return null;

  return { ...item, price: item.price.toNumber() };
}
