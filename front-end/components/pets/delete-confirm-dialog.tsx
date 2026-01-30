'use client'

import { Loader2, Trash2 } from 'lucide-react'
import type { Pet } from '@/lib/types'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pet: Pet | null
  onConfirm: () => Promise<void>
  isLoading: boolean
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  pet,
  onConfirm,
  isLoading,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
            <Trash2 className="h-8 w-8 text-destructive" />
          </div>
          <AlertDialogTitle className="text-xl">Delete Pet</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete <strong className="text-foreground">{pet?.name}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-12 w-full rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Yes, Delete'
            )}
          </Button>
          <AlertDialogCancel
            disabled={isLoading}
            className="mt-0 h-12 w-full rounded-xl"
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
