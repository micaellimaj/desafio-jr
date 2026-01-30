'use client'

import useSWR from 'swr'
import { apiClient } from '@/lib/api'
import type { Pet } from '@/lib/types'

// Fetcher function for SWR
async function fetcher(search: string): Promise<Pet[]> {
  const response = await apiClient.getPets(search || undefined)
  return response.pets
}

export function usePets(search: string = '') {
  const { data, error, isLoading, mutate } = useSWR<Pet[]>(
    ['pets', search],
    () => fetcher(search),
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  )

  return {
    pets: data ?? [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
