import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const updatePetImageSchema = z.object({
  imageId: z.string().uuid(),
  userId: z.string().uuid(),
  fileName: z.string(),
});

export type UpdatePetImageDto = z.infer<typeof updatePetImageSchema>;

export class UpdatePetImageSwaggerDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}