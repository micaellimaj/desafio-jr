import { apiClient } from '@/lib/api'
import type { LoginCredentials, RegisterData, LoginResponse } from '@/lib/types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials)
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const { confirmPassword, ...payload } = data
    return apiClient.post<LoginResponse>('/auth/register', payload)
  }
}