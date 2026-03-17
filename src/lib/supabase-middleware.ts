import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session - IMPORTANT: do not remove this
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public routes that do not require authentication
  const publicRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/verify-email",
    "/auth/callback",
  ]
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  // Static assets and API routes (except auth-related) should pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return supabaseResponse
  }

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("returnUrl", pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated but email is not confirmed, redirect to verify-email
  // (except on public routes where they might be verifying)
  if (user && !user.email_confirmed_at && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/verify-email"
    return NextResponse.redirect(url)
  }

  // If user is authenticated and visiting auth pages, redirect to dashboard
  if (user && user.email_confirmed_at && isPublicRoute && pathname !== "/auth/callback") {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
