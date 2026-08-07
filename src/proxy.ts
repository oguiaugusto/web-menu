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

export async function proxy(request: NextRequest) {
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

  const setCookies = response.headers.getSetCookie();

  for (const cookieStr of setCookies) {
    const [nameValue] = cookieStr.split(';');
    const eqIdx = nameValue.indexOf('=');
    const name = nameValue.slice(0, eqIdx).trim();
    const value = nameValue.slice(eqIdx + 1).trim();
    request.cookies.set(name, value);
  }

  const next = NextResponse.next({ request });

  for (const cookie of setCookies) {
    next.headers.append('Set-Cookie', cookie);
  }

  return next;
}

export const config = {
  matcher: ['/admin/:path*'],
};
