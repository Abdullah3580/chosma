import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get('admin_token')?.value
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = req.nextUrl.pathname === '/admin/login'

  if (isAdminPath && !isLoginPath && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  if (isLoginPath && adminToken) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
