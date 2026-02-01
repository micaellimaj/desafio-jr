import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const uploadPetImageSchema = z.object({
  petId: z.string().uuid({ message: "ID do pet inválido" }),
});

export type UploadPetImageDto = z.infer<typeof uploadPetImageSchema>;

export class UploadPetFileSwaggerDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}