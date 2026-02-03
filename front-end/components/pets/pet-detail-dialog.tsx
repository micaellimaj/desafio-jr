'use client'

import { Cat, Dog, Pencil, Trash2, X, Calendar, User, PawPrint, Phone } from 'lucide-react'
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
import Image from 'next/image'
import { API_BASE_URL } from '@/lib/api'

interface PetDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pet: Pet | null
  isOwner: boolean
  onEdit: (pet: Pet) => void
  onDelete: (pet: Pet) => void
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

export function PetDetailDialog({ open, onOpenChange, pet, isOwner, onEdit, onDelete }: PetDetailDialogProps) {
  if (!pet) return null

  const TypeIcon = getTypeIcon(pet.type)
  const gradient = getTypeGradient(pet.type)

  const updateTimestamp = pet.updatedAt ? new Date(pet.updatedAt).getTime() : Date.now();

  const petImage = pet.images && pet.images.length > 0 
  ? `${API_BASE_URL}/uploads/${pet.images[0].url}?v=${updateTimestamp}` 
  : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-0 p-0 shadow-2xl">
        
        {/* Cabeçalho com Imagem ou Gradiente */}
        <div className={`relative flex h-64 items-center justify-center bg-gradient-to-br ${gradient}`}>
          {petImage ? (
            <Image 
              src={petImage} 
              alt={pet.name} 
              fill 
              className="object-cover"
              priority
            />
          ) : (
          <TypeIcon className="h-28 w-28 text-muted-foreground/30" />
          )}
          
          <div className="absolute inset-0 bg-black/5" />

          <button
            onClick={() => onOpenChange(false)}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-muted-foreground shadow-md backdrop-blur-sm hover:bg-card"
          >
            <X className="h-5 w-5" />
          </button>

          {isOwner && (
            <Badge className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-primary-foreground">
              Seu Pet
            </Badge>
          )}
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{pet.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{pet.name}</h2>
            <p className="mt-1 text-muted-foreground">{pet.breed}</p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Espécie</p>
              <p className="mt-1 font-semibold">{pet.type === 'GATO' ? 'Gato' : 'Cão'}</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Idade</p>
              <p className="mt-1 font-semibold">{pet.age} {pet.age === 1 ? 'Ano' : 'Anos'}</p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">Raça</p>
              <p className="mt-1 truncate font-semibold">{pet.breed}</p>
            </div>
          </div>

          {/* Info do Dono */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{pet.ownerName}</p>
                <p className="text-sm text-muted-foreground">Proprietário</p>
              </div>
            </div>

            {pet.ownerContact && (
              <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{pet.ownerContact}</p>
                  <p className="text-sm text-muted-foreground">Contato</p>
                </div>
              </div>
            )}
          </div>

          {/* Data de Registro */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Registrado em {new Date(pet.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>

          {/* Ações */}
          {isOwner && (
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => { onOpenChange(false); onEdit(pet); }} className="flex-1 rounded-xl bg-transparent">
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button variant="outline" onClick={() => { onOpenChange(false); onDelete(pet); }} className="flex-1 rounded-xl text-destructive border-destructive/20 bg-transparent hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Excluir
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}