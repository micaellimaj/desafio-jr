import type { ApiError } from '@/lib/types'

const API_BASE_URL = 'http://localhost:4001'

class ApiClient {

private getToken(): string | null {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem('petshop_auth');
  if (!auth) return null;

  try {
    const parsed = JSON.parse(auth);
    const token = parsed.access_token || parsed.token || parsed.accessToken;
    
    if (!token) {
      console.warn("Token não encontrado dentro do objeto petshop_auth");
    }
    
    return token;
  } catch (e) {
    console.error("Erro ao fazer parse do petshop_auth", e);
    return null;
  }
}

  private async request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = this.getToken()
  
  // Ajuste: Só define JSON se não for FormData
  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers);

  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, value as string);
      });
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: isFormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined),
  })

    if (response.status === 204) return {} as T

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};


    if (!response.ok) {
      console.error(`ERRO API (${response.status}):`, data);

      const error: ApiError = {
        status: response.status,
        message: data.message || data.error || 'Ocorreu um erro',
        errors: data.errors,
      }
      throw error
    }

    return data
  }

  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    })
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body,
    })
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()


export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as ApiError).message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Ocorreu um erro inesperado'
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