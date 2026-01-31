'use client'

import { PawPrint, Search } from 'lucide-react'

interface PetListEmptyProps {
  isSearching: boolean
  searchQuery: string
}

export function PetListEmpty({ isSearching, searchQuery }: PetListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
        {isSearching ? (
          <Search className="h-12 w-12 text-primary" />
        ) : (
          <PawPrint className="h-12 w-12 text-primary" />
        )}
      </div>
      {isSearching ? (
        <>
          <h3 className="mb-2 text-xl font-bold text-foreground">Nenhum animal de estimação encontrado</h3>
          <p className="max-w-sm text-muted-foreground">
            {"We couldn't find any pets matching "}
            <span className="font-medium text-foreground">&quot;{searchQuery}&quot;</span>. Experimente um
            termo de pesquisa diferente.
          </p>
        </>
      ) : (
        <>
          <h3 className="mb-2 text-xl font-bold text-foreground">No pets yet</h3>
          <p className="max-w-sm text-muted-foreground">
            Seja o primeiro a adicionar um amigo peludo! Clique no &quot;Adicionar animal de estimação&quot; botão para começar.
          </p>
        </>
      )}
    </div>
  )
}
