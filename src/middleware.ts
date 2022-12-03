// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const data = await (await fetch(request.nextUrl.href)).json()
    return NextResponse.redirect(data.url)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/get-url/:path*',
}