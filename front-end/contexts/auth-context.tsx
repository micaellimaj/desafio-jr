'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import type { AuthUser, LoginCredentials, RegisterData } from '@/lib/types'
import { authService } from '@/services/auth'
import { getErrorMessage } from '@/lib/api'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'petshop_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from storage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedAuth) {
      try {
        const parsedUser = JSON.parse(storedAuth) as AuthUser
        setUser(parsedUser)
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const data = await authService.login(credentials)
      
      const authData = { ...data.user, token: data.token }
      setUser(authData)
      localStorage.setItem('petshop_auth', JSON.stringify(authData))
      
      router.push('/dashboard')
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await authService.register(data)
      
      const authData = { ...response.user, token: response.token }
      setUser(authData)
      localStorage.setItem('petshop_auth', JSON.stringify(authData))
      
      router.push('/dashboard')
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
