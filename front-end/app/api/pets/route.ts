import { NextResponse } from 'next/server'
import type { Pet } from '@/lib/types'
import {
  getAllPets,
  setPet,
  getUserFromToken,
} from '@/lib/pet-store'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const user = getUserFromToken(authHeader)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')?.toLowerCase() || ''

  let filteredPets = getAllPets()

  if (search) {
    filteredPets = filteredPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search) ||
        pet.ownerName.toLowerCase().includes(search)
    )
  }

  // Sort by createdAt descending
  filteredPets.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return NextResponse.json({ pets: filteredPets })
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const user = getUserFromToken(authHeader)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, species, breed, age } = body

    if (!name || !species || !breed || age === undefined) {
      return NextResponse.json(
        { error: 'Name, species, breed, and age are required' },
        { status: 400 }
      )
    }

    if (species !== 'Dog' && species !== 'Cat') {
      return NextResponse.json(
        { error: 'Species must be either Dog or Cat' },
        { status: 400 }
      )
    }

    const newPet: Pet = {
      id: `pet_${Date.now()}`,
      name,
      species,
      breed,
      age: Number(age),
      ownerId: user.id,
      ownerName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setPet(newPet.id, newPet)

    return NextResponse.json({ pet: newPet }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
