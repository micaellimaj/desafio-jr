import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(1, 'O nome do pet é obrigatório'),
  age: z.number().int().min(0, 'A idade não pode ser negativa'),
  type: z.enum(['GATO', 'CACHORRO']),
  breed: z.string().min(1, 'A raça é obrigatória'),
  ownerName: z.string().min(1, 'O nome do dono é obrigatório'),
  ownerContact: z.string().min(1, 'O contato do dono é obrigatório'),
});

export class CreatePetDto {
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
}
