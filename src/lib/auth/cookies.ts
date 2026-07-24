'use server';

import { cookies } from 'next/headers';

type AuthCookiesProps = { refreshToken: string; accessToken: string };

export async function setAuthCookies({ refreshToken, accessToken }: AuthCookiesProps) {
  const cookieStore = await cookies();

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
  });

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60,
  });
}
