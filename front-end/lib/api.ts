import type { Pet, PetFormData, ApiError } from '@/lib/types'

const API_BASE_URL = '/api'

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    const auth = localStorage.getItem('petshop_auth')
    if (!auth) return null
    try {
      const parsed = JSON.parse(auth)
      return parsed.token || null
    } catch {
      return null
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: data.error || 'An error occurred',
        errors: data.errors,
      }
      throw error
    }

    return data
  }

  // Pet endpoints
  async getPets(search?: string): Promise<{ pets: Pet[] }> {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    const query = params.toString()
    return this.request<{ pets: Pet[] }>(`/pets${query ? `?${query}` : ''}`)
  }

  async getPet(id: string): Promise<{ pet: Pet }> {
    return this.request<{ pet: Pet }>(`/pets/${id}`)
  }

  async createPet(data: PetFormData): Promise<{ pet: Pet }> {
    return this.request<{ pet: Pet }>('/pets', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePet(id: string, data: Partial<PetFormData>): Promise<{ pet: Pet }> {
    return this.request<{ pet: Pet }>(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deletePet(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/pets/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()

// Error handler utility
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as ApiError).message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export function isAuthError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as ApiError).status
    return status === 401 || status === 403
  }
  return false
}

export function isNotFoundError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return (error as ApiError).status === 404
  }
  return false
}
