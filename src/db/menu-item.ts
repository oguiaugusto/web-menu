import { prisma } from '@/lib/prisma';
import type { MenuItem as PrismaMenuItem } from '@/generated/prisma/client';

export type MenuItem = Omit<PrismaMenuItem, 'price'> & {
  price: number;
};

export async function getMenuCategories() {
  const items = await prisma.menuItem.findMany({
    distinct: ['category'],
    select: { category: true },
    orderBy: { category: 'asc' },
  });

  return items.map((x) => x.category);
}

export async function getMenuItems(category?: string): Promise<MenuItem[]> {
  const items = await prisma.menuItem.findMany({
    where: { category },
    orderBy: { name: 'asc' },
  });

  return items.map((item) => ({
    ...item,
    price: item.price.toNumber(),
  }));
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  const item = await prisma.menuItem.findUnique({
    where: { id },
  });

  if (!item) return null;

  return { ...item, price: item.price.toNumber() };
}
