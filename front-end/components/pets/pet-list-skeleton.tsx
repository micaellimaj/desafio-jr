'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function PetListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="overflow-hidden rounded-3xl bg-card shadow-lg shadow-primary/5"
        >
          {/* Image Area */}
          <Skeleton className="h-40 w-full rounded-none" />

          {/* Content */}
          <div className="p-4">
            <div className="mb-3">
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="mb-3 flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <Skeleton className="mb-3 h-10 w-full" />
            <div className="flex items-center gap-2 border-t border-border/50 pt-3">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
