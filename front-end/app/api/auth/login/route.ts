import { NextResponse } from 'next/server'

// In-memory user store (in a real app, this would be a database)
const users = new Map<string, { id: string; name: string; email: string; password: string; createdAt: string }>()

// Seed a demo user
users.set('demo@petshop.com', {
  id: '1',
  name: 'Demo User',
  email: 'demo@petshop.com',
  password: 'Demo123',
  createdAt: new Date().toISOString(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = users.get(email.toLowerCase())

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate a simple token (in production, use JWT or similar)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Export users map for use in register route
export { users }
