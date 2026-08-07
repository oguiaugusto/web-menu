'use server';

import { requireCurrentUser } from '@/lib/auth/user';
import { prisma } from '@/lib/prisma';
import { ErrorCode } from '@/types/enums';
import { ResultError } from '@/types/misc';
import { returnError } from '@/utils/return-error';

type ResultSuccess = { success: true };
type UpdateOrderStatusResult = (ResultSuccess & { open: boolean }) | ResultError;

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
