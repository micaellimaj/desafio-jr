export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface AuthUser extends User {
  token: string
}

export interface Pet {
  id: string
  name: string
  species: 'Dog' | 'Cat'
  breed: string
  age: number
  ownerId: string
  ownerName: string
  createdAt: string
  updatedAt: string
}

export interface PetFormData {
  name: string
  species: 'Dog' | 'Cat'
  breed: string
  age: number
}


export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// API Error type
export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}
