import { prisma } from '@/lib/prisma';
import type { MenuItem as PrismaMenuItem } from '@/generated/prisma/client';

export type MenuItem = Omit<PrismaMenuItem, 'price'> & {
  price: number;
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

export async function getMenuItem(restaurantId: string, id: string): Promise<MenuItem | null> {
  const item = await prisma.menuItem.findUnique({
    where: { restaurantId, id },
  });

  if (!item) return null;

  return { ...item, price: item.price.toNumber() };
}
