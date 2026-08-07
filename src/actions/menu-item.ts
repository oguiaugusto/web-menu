'use server';

import { requireCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import { returnError } from '@/utils/return-error';
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
  const user = await requireCurrentUser();

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
  const user = await requireCurrentUser();

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

export async function deleteMenuItem(id: string): Promise<MenuItemResult> {
  const user = await requireCurrentUser();

  try {
    await prisma.menuItem.delete({
      where: { restaurantId: user.restaurant.id, id },
    });
  } catch {
    return returnError({ form: ErrorCode.ITEM_NOT_DELETED });
  }

  return { success: true };
}

export async function updateMenuItemAvailability(id: string, available: boolean): Promise<void> {
  const user = await requireCurrentUser();

  await prisma.menuItem.updateMany({
    where: { restaurantId: user.restaurant.id, id },
    data: { available },
  });
}
