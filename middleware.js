import { NextResponse } from 'next/server';

const redirectToAssinar = (request) => {
  const url = request.nextUrl.clone();
  url.pathname = '/assinar';
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
};

export function middleware(request) {
  const bypassPaywall = process.env.NEXT_PUBLIC_BYPASS_PAYWALL === 'true';
  const hasAuthCookie = request.cookies.get('auth_token');

  if (bypassPaywall || (hasAuthCookie && hasAuthCookie.value)) {
    return NextResponse.next();
  }

  return redirectToAssinar(request);
}

export const config = {
  matcher: ['/dashboard/:path*']
};
