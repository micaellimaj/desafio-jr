'use client'

import { useState, useMemo, useCallback } from 'react'
import { Plus, Cat, Dog, PawPrint, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/auth-context'
import { usePets } from '@/hooks/use-pets'
import { apiClient, getErrorMessage, isAuthError } from '@/lib/api'
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

const categories = [
  { id: 'all', label: 'All', icon: PawPrint },
  { id: 'cat', label: 'Cats', icon: Cat },
  { id: 'dog', label: 'Dogs', icon: Dog },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Debounce search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(value)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [])

  const { pets, isLoading, mutate } = usePets(debouncedSearch)

  // Filter by category
  const filteredPets = useMemo(() => {
    if (selectedCategory === 'all') return pets
    return pets.filter(
      (pet) => pet.species.toLowerCase() === selectedCategory.toLowerCase()
    )
  }, [pets, selectedCategory])

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Memoized check for pet ownership
  const isOwner = useCallback((pet: Pet) => user?.id === pet.ownerId, [user?.id])

  // Stats
  const stats = useMemo(() => {
    const total = pets.length
    const myPets = pets.filter((pet) => pet.ownerId === user?.id).length
    return { total, myPets }
  }, [pets, user?.id])

  // Handlers
  const handleAddPet = () => {
    setSelectedPet(null)
    setFormDialogOpen(true)
  }

  const handleEditPet = (pet: Pet) => {
    setSelectedPet(pet)
    setFormDialogOpen(true)
  }

  const handleDeleteClick = (pet: Pet) => {
    setSelectedPet(pet)
    setDeleteDialogOpen(true)
  }

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet)
    setDetailDialogOpen(true)
  }

  const handleFormSubmit = async (data: PetFormData) => {
    setIsSubmitting(true)
    try {
      if (selectedPet) {
        await apiClient.updatePet(selectedPet.id, data)
        toast.success('Pet updated successfully')
      } else {
        await apiClient.createPet(data)
        toast.success('Pet added successfully')
      }
      setFormDialogOpen(false)
      mutate()
    } catch (error) {
      if (isAuthError(error)) {
        toast.error('Session expired. Please login again.')
        logout()
        return
      }
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedPet) return

    setIsSubmitting(true)
    try {
      await apiClient.deletePet(selectedPet.id)
      toast.success('Pet deleted successfully')
      setDeleteDialogOpen(false)
      setSelectedPet(null)
      mutate()
    } catch (error) {
      if (isAuthError(error)) {
        toast.error('Session expired. Please login again.')
        logout()
        return
      }
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground shadow-xl shadow-primary/20 sm:p-8">
          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">Welcome to PetShop</span>
            </div>
            <h2 className="mb-2 text-balance text-xl font-bold sm:text-2xl">
              Find Your Perfect Companion
            </h2>
            <p className="mb-4 max-w-md text-sm opacity-90">
              Discover adorable cats and dogs waiting for a loving home.
              Register your pets or browse our collection of furry friends.
            </p>
            <Button
              onClick={handleAddPet}
              variant="secondary"
              className="rounded-xl bg-card text-primary shadow-lg hover:bg-card/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Register New Pet
            </Button>
          </div>
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-20">
            <PawPrint className="h-32 w-32 rotate-12" />
          </div>
          <div className="pointer-events-none absolute right-20 top-4 opacity-15">
            <PawPrint className="h-16 w-16 -rotate-12" />
          </div>
          <div className="pointer-events-none absolute bottom-4 right-40 opacity-10">
            <PawPrint className="h-12 w-12 rotate-45" />
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
            {"Let's Find a"}
            <br />
            <span className="text-primary">Cute Friend</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {stats.total} pets available{' '}
            {stats.myPets > 0 && `(${stats.myPets} yours)`}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by pet name or owner..."
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Categories</h2>
          </div>
          <div className="flex gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex shrink-0 flex-col items-center gap-2 rounded-2xl px-5 py-3 transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-card text-muted-foreground shadow-sm hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pets Section */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Our Pets</h2>
            <Button
              onClick={handleAddPet}
              size="sm"
              className="rounded-xl shadow-lg shadow-primary/30"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Pet
            </Button>
          </div>

          {/* Pet List */}
          {isLoading ? (
            <PetListSkeleton />
          ) : filteredPets.length === 0 ? (
            <PetListEmpty
              isSearching={!!debouncedSearch || selectedCategory !== 'all'}
              searchQuery={debouncedSearch || selectedCategory}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isOwner={isOwner(pet)}
                  onEdit={handleEditPet}
                  onDelete={handleDeleteClick}
                  onClick={handlePetClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
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
