import { NextResponse } from 'next/server'
import type { Pet } from '@/lib/types'
import {
  getPet,
  setPet,
  deletePet,
  getUserFromToken,
} from '@/lib/pet-store'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const authHeader = request.headers.get('authorization')
  const user = getUserFromToken(authHeader)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pet = getPet(id)

  if (!pet) {
    return NextResponse.json({ error: 'Pet not found' }, { status: 404 })
  }

  return NextResponse.json({ pet })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const authHeader = request.headers.get('authorization')
  const user = getUserFromToken(authHeader)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pet = getPet(id)

  if (!pet) {
    return NextResponse.json({ error: 'Pet not found' }, { status: 404 })
  }

  if (pet.ownerId !== user.id) {
    return NextResponse.json(
      { error: 'You can only edit your own pets' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { name, species, breed, age } = body

    // Validate species
    if (species && species !== 'Dog' && species !== 'Cat') {
      return NextResponse.json(
        { error: 'Species must be either Dog or Cat' },
        { status: 400 }
      )
    }

    const updatedPet: Pet = {
      ...pet,
      name: name ?? pet.name,
      species: species ?? pet.species,
      breed: breed ?? pet.breed,
      age: age !== undefined ? Number(age) : pet.age,
      updatedAt: new Date().toISOString(),
    }

    setPet(id, updatedPet)

    return NextResponse.json({ pet: updatedPet })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const authHeader = request.headers.get('authorization')
  const user = getUserFromToken(authHeader)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pet = getPet(id)

  if (!pet) {
    return NextResponse.json({ error: 'Pet not found' }, { status: 404 })
  }

  if (pet.ownerId !== user.id) {
    return NextResponse.json(
      { error: 'You can only delete your own pets' },
      { status: 403 }
    )
  }

  deletePet(id)

  return NextResponse.json({ message: 'Pet deleted successfully' })
}
