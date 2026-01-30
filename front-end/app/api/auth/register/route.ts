import { NextResponse } from 'next/server'

// Shared in-memory user store
const users = new Map<string, { id: string; name: string; email: string; password: string; createdAt: string }>()

// Seed demo user
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
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase()

    if (users.has(normalizedEmail)) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }

    users.set(normalizedEmail, newUser)

    // Generate a simple token
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
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

export { users }
