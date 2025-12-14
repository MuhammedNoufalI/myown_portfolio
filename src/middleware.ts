
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminSession = request.cookies.get('admin_session')

        // If trying to access protected admin pages (everything except /admin login itself)
        // Note: If /admin is the login page, we allow it.
        // If /admin/dashboard etc, we check cookie.

        const isLoginPage = request.nextUrl.pathname === '/admin'

        if (!isLoginPage && !adminSession) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        if (isLoginPage && adminSession) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
