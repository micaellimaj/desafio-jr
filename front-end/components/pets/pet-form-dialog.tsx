'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PawPrint, ImagePlus, X } from 'lucide-react'
import { petSchema, type PetFormData } from '@/lib/schemas'
import type { Pet } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PetFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pet?: Pet | null
  onSubmit: (data: PetFormData, file?: File | null) => Promise<void>
  isLoading: boolean
}

const typeOptions = [
  { value: 'CACHORRO', label: 'Cão' },
  { value: 'GATO', label: 'Gato' },
]

export function PetFormDialog({ open, onOpenChange, pet, onSubmit, isLoading }: PetFormDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const isEditing = !!pet
  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: '',
      type: 'CACHORRO',
      breed: '',
      age: 0,
      ownerName: '',
      ownerContact: '',
    },
  })

  useEffect(() => {
    if (open) {
      setSelectedFile(null)
      setPreviewUrl(null)
      if (pet) {
        form.reset({
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: pet.age,
          ownerName: pet.ownerName,
          ownerContact: pet.ownerContact,
        })
        if (pet.images && pet.images.length > 0) {
          const imageUrl = pet.images[0].url;
          setPreviewUrl(`http://localhost:4001/uploads/${imageUrl}?v=${new Date(pet.updatedAt).getTime()}`);
        }
      } else {
        form.reset({ name: '', type: 'CACHORRO', breed: '', age: 0, ownerName: '', ownerContact: '' })
      }
    }
  }, [open, pet, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleInternalSubmit = async (data: PetFormData) => {
    await onSubmit(data, selectedFile)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <PawPrint className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            {isEditing ? 'Editar Pet' : 'Adicionar Novo Pet'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isEditing ? 'Atualize as informações do seu amigo.' : 'Preencha os dados para cadastrar o pet.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-4">
            
            {/* Campo Visual de Upload */}
            <div className="flex flex-col items-center justify-center space-y-2 pb-2">
              <FormLabel>Foto do Pet</FormLabel>
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                      className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-white shadow-sm"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <ImagePlus className="h-8 w-8 text-muted-foreground/40" />
                    <span className="text-[10px] text-muted-foreground">Adicionar foto</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Pet</FormLabel>
                  <FormControl><Input placeholder="Ex: Bento" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espécie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {typeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raça</FormLabel>
                  <FormControl><Input placeholder="Ex: Labrador" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Dono</FormLabel>
                  <FormControl><Input placeholder="Quem é o responsável?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato</FormLabel>
                  <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col gap-2 pt-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isEditing ? 'Salvar Alterações' : 'Cadastrar Pet'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}