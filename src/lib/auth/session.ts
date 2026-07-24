import { dayjsUtc } from '@/utils/dayjs-utc';
import { prisma } from '../prisma';
import { generateToken, hashToken, signAccessToken } from './token';
import { setAuthCookies } from './cookies';

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
