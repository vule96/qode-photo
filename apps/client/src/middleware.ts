import { userKey } from '@qode-photo/shared';
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const userCookie = request.cookies.get(userKey)?.value;

  if (
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register')) &&
    userCookie
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/upload') && !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/upload'],
};
