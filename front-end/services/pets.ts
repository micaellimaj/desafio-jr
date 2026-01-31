import { apiClient } from '@/lib/api'
import type { Pet, PetFormData } from '@/lib/types'

export const petService = {

  async list(query?: string): Promise<Pet[]> {
    const endpoint = query ? `/pets?query=${encodeURIComponent(query)}` : '/pets'
    return apiClient.get<Pet[]>(endpoint)
  },

  async create(data: PetFormData): Promise<Pet> {
    return apiClient.post<Pet>('/pets', data)
  },

  async update(id: string, data: Partial<PetFormData>): Promise<Pet> {
    return apiClient.patch<Pet>(`/pets/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/pets/${id}`)
  }
}