'use server';

import { clearAuthCookies, getCookie } from '@/lib/auth/cookies';
import { hashToken } from '@/lib/auth/token';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function logout() {
  const refreshToken = await getCookie('refresh_token');

  if (refreshToken) {
    const tokenHash = hashToken(refreshToken.value);
    await prisma.refreshToken.deleteMany({ where: { tokenHash } });
  }

  await clearAuthCookies();
  redirect('/login');
}
