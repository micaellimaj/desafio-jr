'use client'

import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from "@/contexts/ThemeContext";

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <AuthProvider>
         <ThemeProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
