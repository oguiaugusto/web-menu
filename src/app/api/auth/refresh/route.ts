import { clearAuthCookies } from '@/lib/auth/cookies';
import { refreshSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST() {
  const refreshed = await refreshSession();

  if (!refreshed) {
    await clearAuthCookies();
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 204 });
}
