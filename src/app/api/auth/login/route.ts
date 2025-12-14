
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { password } = await request.json()

    // Hardcoded password for simplicity as requested in plan. 
    // In production, should be env var.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies()
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
