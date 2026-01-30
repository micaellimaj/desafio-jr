import type { Pet } from '@/lib/types'

// In-memory pet store (shared across all API routes)
const pets = new Map<string, Pet>()

// Seed some demo pets
const seedPets: Pet[] = [
  {
    id: 'pet_1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    ownerId: '1',
    ownerName: 'Demo User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet_2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 2,
    ownerId: '1',
    ownerName: 'Demo User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet_3',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador',
    age: 5,
    ownerId: 'user_other',
    ownerName: 'John Smith',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet_4',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Siamese',
    age: 4,
    ownerId: 'user_other',
    ownerName: 'Jane Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet_5',
    name: 'Milo',
    species: 'Cat',
    breed: 'British Shorthair',
    age: 2,
    ownerId: 'user_other2',
    ownerName: 'Mike Johnson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pet_6',
    name: 'Rocky',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 4,
    ownerId: 'user_other2',
    ownerName: 'Sarah Williams',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Initialize with seed data
seedPets.forEach((pet) => pets.set(pet.id, pet))

export function getPets(): Map<string, Pet> {
  return pets
}

export function getPet(id: string): Pet | undefined {
  return pets.get(id)
}

export function setPet(id: string, pet: Pet): void {
  pets.set(id, pet)
}

export function deletePet(id: string): boolean {
  return pets.delete(id)
}

export function getAllPets(): Pet[] {
  return Array.from(pets.values())
}

export function getUserFromToken(authHeader: string | null): { id: string; name: string } | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [userId, userName] = decoded.split(':')
    
    // Return user info based on userId
    if (userId === '1') {
      return { id: '1', name: 'Demo User' }
    }
    // For dynamically registered users, use the name from the token
    return { id: userId, name: userName || 'User' }
  } catch {
    return null
  }
}
