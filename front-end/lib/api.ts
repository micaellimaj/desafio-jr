import type { ApiError } from '@/lib/types'
import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

class ApiClient {
  /**
   * Recupera o token de autenticação do localStorage.
   */
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    const auth = localStorage.getItem('petshop_auth');
    if (!auth) return null;

    try {
      const parsed = JSON.parse(auth);
      return parsed.access_token || parsed.token || parsed.accessToken;
    } catch (e) {
      console.error("Erro ao fazer parse do petshop_auth", e);
      return null;
    }
  }

  /**
   * Método genérico de requisição (Wrapper sobre o Fetch API).
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const isFormData = options.body instanceof FormData;
    
    const headers = new Headers(options.headers);

    if (!isFormData) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      body: isFormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined),
    });

    // Caso de sucesso sem conteúdo
    if (response.status === 204) return {} as T;

    const text = await response.text();
    let data;
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    // Tratamento de Erros da API
    if (!response.ok) {
      console.error(`ERRO API (${response.status}):`, data);

      const error: ApiError = {
        status: response.status,
        message: data.message || data.error || 'Ocorreu um erro',
        errors: data.errors,
      };
      throw error;
    }

    return data;
  }

  // Métodos Públicos
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Suporta 3 argumentos para evitar o erro TS2554.
   */
  async post<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body,
    });
  }

  async patch<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

// Funções Utilitárias de Tratamento de Erro

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as ApiError).message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ocorreu um erro inesperado';
}

export function isAuthError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as ApiError).status;
    return status === 401 || status === 403;
  }
  return false;
}

export function isNotFoundError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return (error as ApiError).status === 404;
  }
  return false;
}