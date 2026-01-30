'use client'

import { Cat, Dog, Pencil, Trash2, PawPrint } from 'lucide-react'
import type { Pet } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ElementType } from 'react'

interface PetCardProps {
  pet: Pet
  isOwner: boolean
  onEdit: (pet: Pet) => void
  onDelete: (pet: Pet) => void
  onClick: (pet: Pet) => void
}

const speciesIcons: Record<string, ElementType> = {
  dog: Dog,
  cat: Cat,
}

function getSpeciesIcon(species: string) {
  return speciesIcons[species.toLowerCase()] || PawPrint
}

function getSpeciesGradient(species: string) {
  const gradients: Record<string, string> = {
    dog: 'from-amber-100 to-orange-100',
    cat: 'from-purple-100 to-pink-100',
  }
  return gradients[species.toLowerCase()] || 'from-gray-100 to-slate-100'
}

function getSpeciesColor(species: string) {
  const colors: Record<string, string> = {
    dog: 'bg-amber-500/10 text-amber-600',
    cat: 'bg-purple-500/10 text-purple-600',
  }
  return colors[species.toLowerCase()] || 'bg-gray-500/10 text-gray-600'
}

export function PetCard({ pet, isOwner, onEdit, onDelete, onClick }: PetCardProps) {
  const SpeciesIcon = getSpeciesIcon(pet.species)
  const speciesGradient = getSpeciesGradient(pet.species)
  const speciesColor = getSpeciesColor(pet.species)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(pet)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(pet)
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-card shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Image/Icon Area */}
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${speciesGradient}`}
      >
        <SpeciesIcon className="h-16 w-16 text-muted-foreground/30" />

        {/* Owner Actions - Always visible for owners */}
        {isOwner && (
          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(pet)
              }}
              className="h-8 w-8 rounded-full bg-card/90 shadow-md backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
              title="Edit pet"
            >
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only">Edit {pet.name}</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(pet)
              }}
              className="h-8 w-8 rounded-full bg-card/90 text-destructive shadow-md backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
              title="Delete pet"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Delete {pet.name}</span>
            </Button>
          </div>
        )}

        {/* Owner badge for non-owners */}
        {!isOwner && (
          <div className="absolute right-3 top-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-xs font-semibold text-primary shadow-md backdrop-blur-sm">
              {pet.ownerName.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Breed */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">{pet.name}</h3>
            {isOwner && (
              <Badge variant="secondary" className="rounded-full bg-primary/10 text-xs text-primary">
                Yours
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {pet.breed} - {pet.age} {pet.age === 1 ? 'year' : 'years'}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`rounded-full px-3 ${speciesColor}`}>
            {pet.species}
          </Badge>
          <span className="text-xs text-muted-foreground">{pet.ownerName}</span>
        </div>
      </div>
    </div>
  )
}
