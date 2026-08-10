'use server';

import { SLUG_PATTERN } from '@/constants/regex';
import { requireCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { returnError } from '@/utils/return-error';

type ResultSuccess = { success: true };
type UpdateOrderStatusResult = (ResultSuccess & { open: boolean }) | ResultError;
type CheckRestaurantSlugAvailabilityResult = { success: true; available: boolean } | ResultError;

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
