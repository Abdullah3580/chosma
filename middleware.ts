import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Admin path check
  const adminToken = req.cookies.get('admin_token')?.value
  if (path.startsWith('/admin') && path !== '/admin/login' && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  if (path === '/admin/login' && adminToken) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  // Account path protection - require authentication
  if (path.startsWith('/account')) {
    let res = NextResponse.next({ request: { headers: req.headers } })
    
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
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
}