import { UserPublic } from '@/db/user';
import { getCookie } from './cookies';
import { verifyAccessToken } from './token';
import { prisma } from '../prisma';

export async function getCurrentUser(): Promise<UserPublic | null> {
  const accessToken = await getCookie('access_token');
  if (!accessToken) return null;

  const payload = await verifyAccessToken(accessToken.value);
  if (!payload?.sub) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    include: { restaurant: true },
    omit: { passwordHash: true },
  });

  if (!user || !user.restaurant) return null;

  return {
    ...user,
    restaurant: {
      ...user.restaurant,
      deliveryFee: user.restaurant.deliveryFee?.toNumber() ?? null,
    },
  };
}
