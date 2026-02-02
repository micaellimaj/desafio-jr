export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

export interface AuthUser extends User {
  token?: string
  access_token?: string 
}

export interface PetImage {
  id: string;
  url: string;
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  type: 'CACHORRO' | 'GATO'; 
  breed: string;
  ownerName: string;
  ownerContact: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  images: { id: string; url: string }[];
}

// Para criação, conforme seu createPetSchema
export interface PetFormData {
  name: string;
  age: number;
  type: 'GATO' | 'CACHORRO';
  breed: string;
  ownerName: string;
  ownerContact: string;
}

// Para criação, conforme seu createPetSchema
export interface PetFormData {
  name: string;
  age: number;
  type: 'GATO' | 'CACHORRO';
  breed: string;
  ownerName: string;
  ownerContact: string;
}

// Interface para o retorno do Login do NestJS
export interface LoginResponse {
  user: User
  token: string
  access_token?: string
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
