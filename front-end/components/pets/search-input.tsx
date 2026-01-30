'use client'

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search here...',
}: SearchInputProps) {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-2xl border-border/50 bg-card pl-11 pr-10 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full hover:bg-muted"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <SlidersHorizontal className="h-5 w-5" />
        <span className="sr-only">Filter options</span>
      </Button>
    </div>
  )
}
