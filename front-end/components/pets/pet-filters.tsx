// components/pets/pet-filters.tsx
import { ListFilter, SortAsc, SortDesc, Calendar, PawPrint  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu"

export type SortOption = 'recent' | 'age_asc' | 'age_desc' | 'name'

interface PetFiltersProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function PetFilters({ currentSort, onSortChange }: PetFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl h-11 w-11 shadow-sm">
          <ListFilter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSortChange('recent')} className="gap-2">
          <Calendar className="h-4 w-4" /> Mais recentes
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('age_asc')} className="gap-2">
          <SortAsc className="h-4 w-4" /> Menor idade
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('age_desc')} className="gap-2">
          <SortDesc className="h-4 w-4" /> Maior idade
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange('name')} className="gap-2">
          <PawPrint className="h-4 w-4" /> Nome (A-Z)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}