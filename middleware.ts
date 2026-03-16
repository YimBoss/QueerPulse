import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Verificar sesión de Supabase
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 2. Lógica de protección para /chat
  if (pathname.startsWith('/chat')) {
    // Si no está logueado, al login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Si está logueado, verificar edad
    const ageCookie = request.cookies.get('qp_age_verified')?.value
    if (ageCookie !== '1') {
      const url = request.nextUrl.clone()
      url.pathname = '/age'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}