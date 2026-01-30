'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { PawPrint } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-primary shadow-xl shadow-primary/30">
          <PawPrint className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">PetShop</h1>
          <p className="mt-1 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  )
}
