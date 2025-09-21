import { NextResponse } from 'next/server';

const redirectToAssinar = (request) => {
  const url = request.nextUrl.clone();
  url.pathname = '/assinar';
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
};

export function middleware(request) {
  return redirectToAssinar(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cursos/:path*',
    '/ebooks/:path*',
    '/documentarios/:path*',
    '/revistas/:path*'
  ]
};
