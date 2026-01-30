'use client'

import { Cat, Dog, Pencil, Trash2, X, Calendar, User, PawPrint } from 'lucide-react'
import type { Pet } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { ElementType } from 'react'

interface PetDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pet: Pet | null
  isOwner: boolean
  onEdit: (pet: Pet) => void
  onDelete: (pet: Pet) => void
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

export function PetDetailDialog({
  open,
  onOpenChange,
  pet,
  isOwner,
  onEdit,
  onDelete,
}: PetDetailDialogProps) {
  if (!pet) return null

  const SpeciesIcon = getSpeciesIcon(pet.species)
  const speciesGradient = getSpeciesGradient(pet.species)
  const speciesColor = getSpeciesColor(pet.species)

  const handleEdit = () => {
    onOpenChange(false)
    onEdit(pet)
  }

  const handleDelete = () => {
    onOpenChange(false)
    onDelete(pet)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-0 p-0 shadow-2xl">
        {/* Header with pet image/icon */}
        <div
          className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${speciesGradient}`}
        >
          <SpeciesIcon className="h-28 w-28 text-muted-foreground/30" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-muted-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-card"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Owner badge */}
          {isOwner && (
            <Badge className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-primary-foreground shadow-md">
              Your Pet
            </Badge>
          )}

          {/* Decorative paw prints */}
          <div className="absolute bottom-8 right-8 opacity-20">
            <PawPrint className="h-12 w-12 rotate-12" />
          </div>
          <div className="absolute right-20 top-8 opacity-15">
            <PawPrint className="h-8 w-8 -rotate-12" />
          </div>
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{pet.name}</DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Name and breed */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{pet.name}</h2>
            <p className="mt-1 text-muted-foreground">{pet.breed}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Species</p>
              <p className="mt-1 font-semibold capitalize text-foreground">
                {pet.species}
              </p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="mt-1 font-semibold text-foreground">
                {pet.age} {pet.age === 1 ? 'Year' : 'Years'}
              </p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Breed</p>
              <p className="mt-1 truncate font-semibold text-foreground">
                {pet.breed}
              </p>
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{pet.ownerName}</p>
              <p className="text-sm text-muted-foreground">Pet Owner</p>
            </div>
          </div>

          {/* Created date */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Registered on{' '}
              {new Date(pet.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Action Buttons - Only for owner */}
          {isOwner && (
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex-1 rounded-xl border-primary/20 hover:bg-primary/10 hover:text-primary bg-transparent"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="flex-1 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
