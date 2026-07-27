import { verifyAccessToken } from '@/lib/auth/token';
import { NextRequest, NextResponse } from 'next/server';

function clearAndRedirect(request: NextRequest) {
  const url = new URL('/login', request.url);
  url.searchParams.set('next', request.nextUrl.pathname);

  const response = NextResponse.redirect(url);
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  return response;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken.value);
    if (payload && payload.sub) {
      return NextResponse.next();
    }
  }

  const refreshToken = request.cookies.get('refresh_token');
  if (!refreshToken) {
    return clearAndRedirect(request);
  }

  const response = await fetch(new URL('/api/auth/refresh', request.url), {
    method: 'POST',
    headers: { cookie: request.headers.get('cookie') ?? '' },
  });

  if (!response.ok) {
    return clearAndRedirect(request);
  }

  const next = NextResponse.next();

  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    next.headers.set('Set-Cookie', setCookieHeader);
  }

  return next;
}

export const config = {
  matcher: ['/admin/:path*'],
};
