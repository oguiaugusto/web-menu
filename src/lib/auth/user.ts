'use server';

import { prisma } from '../prisma';
import { hashToken, verifyAccessToken } from './token';
import { dayjsUtc } from '@/utils/dayjs-utc';
import { createSession } from './session';
import { getCookie } from './cookies';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const accessToken = await getCookie('access_token');
  if (!accessToken) return null;

  const payload = await verifyAccessToken(accessToken.value);
  if (!payload || !payload.sub) return null;

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

export async function requireUser() {
  const user = await getCurrentUser();
  if (user) return user;

  const exRefreshToken = await getCookie('refresh_token');
  if (!exRefreshToken) redirect('/login');

  const tokenHash = hashToken(exRefreshToken.value);
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: { restaurant: true },
        omit: { passwordHash: true },
      },
    },
  });

  if (!refreshToken || !refreshToken.user || !refreshToken.user.restaurant) redirect('/login');

  // Refresh tokens are single-use
  await prisma.refreshToken.delete({ where: { id: refreshToken.id } });

  if (dayjsUtc.isAfter(refreshToken.expiresAt)) redirect('/login');

  await createSession(refreshToken.user.id);
  return {
    ...refreshToken.user,
    restaurant: {
      ...refreshToken.user.restaurant,
      deliveryFee: refreshToken.user.restaurant.deliveryFee?.toNumber() ?? null,
    },
  };
}
