'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Plus, Cat, Dog, PawPrint } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { petService } from '@/services/pets'
import { getErrorMessage, isAuthError } from '@/lib/api'
import type { Pet } from '@/lib/types'
import type { PetFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard/header'
import { PetCard } from '@/components/pets/pet-card'
import { PetFormDialog } from '@/components/pets/pet-form-dialog'
import { DeleteConfirmDialog } from '@/components/pets/delete-confirm-dialog'
import { PetDetailDialog } from '@/components/pets/pet-detail-dialog'
import { SearchInput } from '@/components/pets/search-input'
import { PetListEmpty } from '@/components/pets/pet-list-empty'
import { PetListSkeleton } from '@/components/pets/pet-list-skeleton'
import {PetFilters, type SortOption} from '@/components/pets/pet-filters'

const categories = [
  { id: 'all', label: 'Todos', icon: PawPrint },
  { id: 'GATO', label: 'Gatos', icon: Cat },
  { id: 'CACHORRO', label: 'Cães', icon: Dog },
]

export default function DashboardPage() {
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const isAdmin = user?.role === 'ADMIN'

  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [authLoading, isAuthenticated, router])

  const loadPets = useCallback(async (query?: string) => {
    setIsLoading(true)
    try {
      const data = await petService.list(query)
      setPets(data)
    } catch (error) {
      if (isAuthError(error)) {
        logout() 
      } else {
        toast.error('Erro ao carregar pets')
      }
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  useEffect(() => {
    if (!isAuthenticated || authLoading) return

    const handler = setTimeout(() => {
      loadPets(searchQuery)
    }, 400)

    return () => clearTimeout(handler)
  }, [searchQuery, loadPets, isAuthenticated, authLoading])


  const filteredPets = useMemo(() => {
  let result = selectedCategory === 'all' 
    ? [...pets] 
    : pets.filter((pet) => pet.type === selectedCategory)

  return result.sort((a, b) => {
    switch (sortBy) {
      case 'age_asc':
        return a.age - b.age
      case 'age_desc':
        return b.age - a.age
      case 'name':
        return a.name.localeCompare(b.name)
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
}, [pets, selectedCategory, sortBy])

  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isOwner = useCallback((pet: Pet) => user?.id === pet.userId, [user?.id])

  const stats = useMemo(() => ({
    total: pets.length,
    myPets: pets.filter((pet) => pet.userId === user?.id).length
  }), [pets, user?.id])

  const handleFormSubmit = async (data: PetFormData, file?: File | null) => {
    setIsSubmitting(true)
    try {
      let savedPet: Pet;

      if (selectedPet) {
  
        savedPet = await petService.update(selectedPet.id, data)
        if (file) {
        try {
           await petService.uploadImage(selectedPet.id, file)
        } catch (imgErr) {
           toast.error("Pet salvo, mas houve erro no upload da imagem.")
        }
      }
    } else {
      savedPet = await petService.create(data)
      if (file && savedPet.id) {
        try {
          await petService.uploadImage(savedPet.id, file)
        } catch (imgErr) {
          toast.error("Pet criado, mas falhou ao subir a imagem.")
        }
      }
    }

    toast.success('Operação realizada!')
    setFormDialogOpen(false)
    loadPets(searchQuery)
  } catch (error) {
    toast.error('Erro ao salvar dados do pet')
  } finally {
    setIsSubmitting(false)
  }
}

  const handleDeleteConfirm = async () => {
    if (!selectedPet) return
    setIsSubmitting(true)
    try {
      await petService.delete(selectedPet.id)
      toast.success('Pet removido com sucesso')
      setDeleteDialogOpen(false)
      loadPets(searchQuery)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPet = () => { setSelectedPet(null); setFormDialogOpen(true); }
  const handleEditPet = (pet: Pet) => { setSelectedPet(pet); setFormDialogOpen(true); }
  const handleDeleteClick = (pet: Pet) => { setSelectedPet(pet); setDeleteDialogOpen(true); }
  const handlePetClick = (pet: Pet) => { setSelectedPet(pet); setDetailDialogOpen(true); }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <PetListSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground shadow-xl">
          <div className="relative z-10">
            <h2 className="text-xl font-bold sm:text-2xl">Encontre seu novo amigo</h2>
            <p className="mb-4 text-sm opacity-90">Gerencie seus pets ou adote um novo companheiro.</p>


            {!isAdmin && (
              <Button onClick={handleAddPet} variant="secondary" className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Cadastrar Pet
            </Button>
            )}
          </div>
          <PawPrint className="absolute -bottom-4 -right-4 h-32 w-32 opacity-20 rotate-12" />
        </div>

        {/* Header de Boas Vindas */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Olá, <span className="text-primary">{user?.name || 'Amigo dos Pets'}</span></h1>
          <p className="text-sm text-muted-foreground">
            {stats.total} pets encontrados {stats.myPets > 0 && `(sendo ${stats.myPets} seus)`}
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <div className="flex-1">
            <SearchInput 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Buscar por nome do pet ou do dono..." 
            />
          </div>
          <PetFilters currentSort={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Categorias */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 transition-all ${
                selectedCategory === cat.id 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-card text-muted-foreground hover:bg-primary/10'
              }`}
            >
              <cat.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Lista de Pets */}
        {isLoading ? (
          <PetListSkeleton />
        ) : filteredPets.length === 0 ? (
          <PetListEmpty isSearching={!!searchQuery} searchQuery={searchQuery} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => (
              <PetCard
                key={`${pet.id}-${new Date(pet.updatedAt).getTime()}`}
                pet={pet}
                isOwner={isOwner(pet)}
                onEdit={handleEditPet}
                onDelete={handleDeleteClick}
                onClick={handlePetClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Diálogos */}
      <PetFormDialog 
        open={formDialogOpen} 
        onOpenChange={setFormDialogOpen} 
        pet={selectedPet} 
        onSubmit={handleFormSubmit} 
        isLoading={isSubmitting} 
      />
      <DeleteConfirmDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen} 
        pet={selectedPet} 
        onConfirm={handleDeleteConfirm} 
        isLoading={isSubmitting} 
      />
      <PetDetailDialog 
        open={detailDialogOpen} 
        onOpenChange={setDetailDialogOpen} 
        pet={selectedPet} 
        isOwner={selectedPet ? isOwner(selectedPet) : false} 
        onEdit={handleEditPet} 
        onDelete={handleDeleteClick} 
      />
    </div>
  )
}