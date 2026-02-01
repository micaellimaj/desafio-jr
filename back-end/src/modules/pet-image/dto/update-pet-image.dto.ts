import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetImageSwaggerDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Novo arquivo de imagem para substituir a anterior',
  })
  file: any;
}