'use server';

import { SLUG_PATTERN } from '@/constants/regex';
import { SUPPORTED_CURRENCIES } from '@/constants/supported-currencies';
import { SUPPORTED_LANGUAGES } from '@/constants/supported-languages';
import { parseRestaurant, Restaurant } from '@/db/restaurant';
import { requireCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { returnError } from '@/utils/return-error';
import { parseZodErrors } from '@/utils/parse-zod-errors';
import z from 'zod';

type ResultSuccess = { success: true };

type UpdateOrderStatusResult = (ResultSuccess & { open: boolean }) | ResultError;
type CheckRestaurantSlugAvailabilityResult = { success: true; available: boolean } | ResultError;
type RestaurantSettingsResult = (ResultSuccess & { restaurant: Restaurant }) | ResultError;

const RestaurantSettingsSchema = z.object({
  name: z.string().trim().nonempty().max(100),
  slug: z.string().trim().lowercase().regex(SLUG_PATTERN),
  language: z.string().refine((language) => SUPPORTED_LANGUAGES.some((option) => option.value === language)),
  currency: z.string().refine((currency) => SUPPORTED_CURRENCIES.some((option) => option.value === currency)),
  deliveryFee: z.number().min(0),
  openingHours: z.string().trim().max(200),
  contact: z.string().trim().max(200),
});

type RestaurantSettingsInput = z.infer<typeof RestaurantSettingsSchema>;

export async function updateRestaurantOpen(open: boolean): Promise<UpdateOrderStatusResult> {
  const user = await requireCurrentUser();

  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: user.restaurant.id },
      data: { open },
    });

    return { success: true, open: restaurant.open };
  } catch {
    return returnError({ form: ErrorCode.FAILED_TO_OPEN_CLOSE_RESTAURANT });
  }
}

export async function checkRestaurantSlugAvailability(slug: string): Promise<CheckRestaurantSlugAvailabilityResult> {
  if (!SLUG_PATTERN.test(slug)) {
    return returnError({ fields: { restaurantUrl: ErrorCode.INVALID_FORMAT } });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { id: true, slug: true },
  });
  return { success: true, available: !restaurant };
}

export async function updateRestaurantSettings(rawData: RestaurantSettingsInput): Promise<RestaurantSettingsResult> {
  const user = await requireCurrentUser();

  const parsed = RestaurantSettingsSchema.safeParse(rawData);
  if (!parsed.success) {
    return returnError({ fields: parseZodErrors(parsed.error) });
  }

  const { data } = parsed;
  const existingRestaurant = await prisma.restaurant.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (existingRestaurant && existingRestaurant.id !== user.restaurant.id) {
    return returnError({ fields: { slug: ErrorCode.ALREADY_IN_USE } });
  }

  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: user.restaurant.id },
      data: {
        name: data.name,
        slug: data.slug,
        language: data.language,
        currency: data.currency,
        deliveryFee: data.deliveryFee,
        openingHours: data.openingHours || null,
        contact: data.contact || null,
      },
    });

    return { success: true, restaurant: parseRestaurant(restaurant) };
  } catch {
    return returnError({ form: ErrorCode.FAILED_TO_UPDATE_RESTAURANT });
  }
}
