import { apiClient } from '@/lib/api'
import type { Pet, PetFormData, PetImage } from '@/lib/types'

export const petService = {

  async list(query?: string): Promise<Pet[]> {
  const cb = Date.now();
  
  const endpoint = query 
    ? `/pets?query=${encodeURIComponent(query)}&cb=${cb}` 
    : `/pets?cb=${cb}`;

  return apiClient.get<Pet[]>(endpoint);
},

  async create(data: PetFormData): Promise<Pet> {
    return apiClient.post<Pet>('/pets', data)
  },

  async update(id: string, data: Partial<PetFormData>): Promise<Pet> {
    return apiClient.patch<Pet>(`/pets/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/pets/${id}`)
  },

  async uploadImage(petId: string, file: File): Promise<PetImage> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<PetImage>(`/pets/${petId}/images`, formData);
  },

  async updateImage(imageId: string, file: File): Promise<PetImage> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.patch<PetImage>(`/pets/images/${imageId}`, formData);
  },

  async deleteImage(imageId: string): Promise<void> {
    return apiClient.delete(`/pets/images/${imageId}`);
  }

}