import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: { headers: req.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: { headers: req.headers } })
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options as never)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = req.nextUrl.pathname

  const adminToken = req.cookies.get('admin_token')?.value
  if (path.startsWith('/admin') && path !== '/admin/login' && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  if (path === '/admin/login' && adminToken) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  // \u09af\u09a6\u09bf user login \u09a5\u09be\u0995\u09c7 \u098f\u09ac\u0982 /auth/login \u09ac\u09be /auth/signup \u098f \u09af\u09be\u09df, \u09a4\u09be\u09b9\u09b2\u09c7 /account \u098f \u09aa\u09be\u09a0\u09be\u0993
  if ((path === '/auth/login' || path === '/auth/signup') && user) {
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // \u09af\u09a6\u09bf user login \u09a8\u09be \u09a5\u09be\u0995\u09c7 \u098f\u09ac\u0982 /account \u09af\u09c7\u0995\u09cb\u0995\u09cb sub-page \u098f \u09af\u09be\u09df, \u09a4\u09be\u09b9\u09b2\u09c7 /auth/login \u098f \u09aa\u09be\u09a0\u09be\u0993
  if (path.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/auth/login', '/auth/signup'],
}