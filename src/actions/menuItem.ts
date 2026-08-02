'use server';

import { getCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ResultError } from '@/types/misc';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import { returnError } from '@/utils/return-error';
import { redirect } from 'next/navigation';
import z from 'zod';

const MenuItemSchema = z.object({
  name: z.string().trim().nonempty().max(100),
  price: z.number().min(0),
  description: z.string().trim().max(500).optional(),
  category: z.string().trim().nonempty().max(100),
  available: z.boolean(),
  imageUrl: z.string().trim().nonempty().nullable(),
});

type MenuItemInput = z.infer<typeof MenuItemSchema>;

type ResultSuccess = { success: true };
export type MenuItemResult = ResultSuccess | ResultError;

export async function createMenuItem(rawData: MenuItemInput): Promise<MenuItemResult> {
  // It should always successfully get the user
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const parsed = MenuItemSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  await prisma.menuItem.create({
    data: {
      restaurantId: user.restaurant.id,
      name: data.name,
      price: data.price,
      description: data.description?.trim() || null,
      category: data.category,
      available: data.available,
      imageUrl: data.imageUrl,
    },
  });

  return { success: true };
}

export async function updateMenuItem(id: string, rawData: MenuItemInput): Promise<MenuItemResult> {
  // It should always successfully get the user
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const parsed = MenuItemSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;

  await prisma.menuItem.update({
    where: { restaurantId: user.restaurant.id, id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description?.trim() || null,
      category: data.category,
      available: data.available,
      imageUrl: data.imageUrl,
    },
  });

  return { success: true };
}
