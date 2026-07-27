import { dayjsUtc } from '@/utils/dayjs-utc';
import { prisma } from '../prisma';
import { generateToken, hashToken, signAccessToken } from './token';
import { getCookie, setAuthCookies } from './cookies';

export async function createSession(userId: string) {
  const refreshToken = generateToken();
  const tokenHash = hashToken(refreshToken);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt: dayjsUtc.add(7, 'days').toDate(),
    },
  });

  const accessToken = await signAccessToken(userId);
  await setAuthCookies({ refreshToken, accessToken });
}

export async function refreshSession() {
  const refreshCookie = await getCookie('refresh_token');
  if (!refreshCookie) return false;

  const tokenHash = hashToken(refreshCookie.value);
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: { restaurant: true },
        omit: { passwordHash: true },
      },
    },
  });
  if (!refreshToken || !refreshToken.user || !refreshToken.user.restaurant) return false;

  // Refresh tokens are single-use
  await prisma.refreshToken.deleteMany({ where: { id: refreshToken.id } });

  if (dayjsUtc.isAfter(refreshToken.expiresAt)) return false;

  await createSession(refreshToken.user.id);
  return true;
}
