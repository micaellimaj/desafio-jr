'use client'

import { Cat, Dog, Pencil, Trash2, PawPrint } from 'lucide-react'
import type { Pet } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ElementType } from 'react'
import Image from 'next/image'



interface PetCardProps {
  pet: Pet
  isOwner: boolean
  onEdit: (pet: Pet) => void
  onDelete: (pet: Pet) => void
  onClick: (pet: Pet) => void
}

const typeIcons: Record<string, ElementType> = {
  CACHORRO: Dog,
  GATO: Cat,
}

function getTypeIcon(type: string) {
  return typeIcons[type.toUpperCase()] || PawPrint
}

function getTypeGradient(type: string) {
  const gradients: Record<string, string> = {
    CACHORRO: 'from-amber-100 to-orange-100',
    GATO: 'from-purple-100 to-pink-100',
  }
  return gradients[type.toUpperCase()] || 'from-gray-100 to-slate-100'
}

function getTypeColor(type: string) {
  const colors: Record<string, string> = {
    CACHORRO: 'bg-amber-500/10 text-amber-600',
    GATO: 'bg-purple-500/10 text-purple-600',
  }
  return colors[type.toUpperCase()] || 'bg-gray-500/10 text-gray-600'
}

export function PetCard({ pet, isOwner, onEdit, onDelete, onClick }: PetCardProps) {
  const TypeIcon = getTypeIcon(pet.type)
  const gradient = getTypeGradient(pet.type)
  const color = getTypeColor(pet.type)

  const updateTimestamp = pet.updatedAt ? new Date(pet.updatedAt).getTime() : Date.now();

  const petImage = pet.images && pet.images.length > 0 
    ? `http://localhost:4001${pet.images[0].url}?v=${updateTimestamp}` 
    : null;


  return (
    <div
      role="button"
      onClick={() => onClick(pet)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:-translate-y-1"
    >
      <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${gradient}`}>
      {petImage ? (
        <img 
          src={petImage} 
          alt={pet.name} 
          className="absolute inset-0 h-full w-full object-cover" 
        />
        ) : (
        <TypeIcon className="h-16 w-16 text-muted-foreground/30" />
        )}

        {isOwner && (
          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => { e.stopPropagation(); onEdit(pet); }}
              className="h-8 w-8 rounded-full bg-card/90"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => { e.stopPropagation(); onDelete(pet); }}
              className="h-8 w-8 rounded-full bg-card/90 text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{pet.name}</h3>
            {isOwner && (
              <Badge className="bg-primary/10 text-primary">Seu pet</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {pet.breed} - {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={`rounded-full px-3 ${color}`}>
            {pet.type === 'GATO' ? 'Gato' : 'Cão'}
          </Badge>
          <span className="text-xs text-muted-foreground">{pet.ownerName}</span>
        </div>
      </div>
    </div>
  )
}

