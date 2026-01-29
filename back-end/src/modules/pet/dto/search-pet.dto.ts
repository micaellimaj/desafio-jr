import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const searchPetSchema = z.object({
  query: z.string().optional()
});

export class SearchPetDto {
  @ApiPropertyOptional({ 
    description: 'Busca pets pelo nome do pet ou pelo nome do dono (busca parcial e insensível a maiúsculas)', 
    example: 'Bento',
    required: false 
  })
  query?: string;
}

export class PetResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Bento' })
  name: string;

  @ApiProperty({ example: 2 })
  age: number;

  @ApiProperty({ enum: ['GATO', 'CACHORRO'], example: 'CACHORRO' })
  type: 'GATO' | 'CACHORRO';

  @ApiProperty({ example: 'Golden Retriever' })
  breed: string;

  @ApiProperty({ example: 'Carlos Silva' })
  ownerName: string;

  @ApiProperty({ example: '(81) 99999-9999' })
  ownerContact: string;

  @ApiProperty({ example: '2026-01-29T20:00:00Z' })
  createdAt: Date;
}