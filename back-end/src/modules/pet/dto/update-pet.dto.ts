import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { z } from 'zod';

export const updatePetSchema = z
  .object({
    name: z.string().min(1),
    age: z.number().int().min(0),
    type: z.enum(['GATO', 'CACHORRO']),
    breed: z.string().min(1),
    ownerName: z.string().min(1),
    ownerContact: z.string().min(1),
  })
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo para atualização',
  });

export class UpdatePetDto extends PartialType(CreatePetDto) {}
