import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const loginCookie = request.cookies.get('login')
  const isLoggedIn = !!loginCookie

  // block any access to pages if no login cookie is detected
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}