import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  UnauthorizedException,
  BadRequestException,
  Delete,
  Patch
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UploadPetImageUseCase } from './use-cases/upload-pet-image';
import { DeletePetImage } from './use-cases/delete-pet-image';
import { UpdatePetImage } from './use-cases/update-pet-image';
import { UploadPetFileSwaggerDto } from './dto/upload-pet-image.dto';
import { UpdatePetImageSwaggerDto } from './dto/update-pet-image.dto';

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetImageController {
  constructor(
    private uploadPetImage: UploadPetImageUseCase,
    private deletePetImage: DeletePetImage,
    private updatePetImage: UpdatePetImage
  ) {}

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('id') petId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {

    const userId = req.user?.userId || req.user?.id;
    
    if (!userId) {
      throw new UnauthorizedException('ID do usuário não encontrado no token');
    }

    if (!file) throw new BadRequestException('O arquivo de imagem é obrigatório');

    return this.uploadPetImage.execute({
      userId,
      petId,
      fileName: file.filename,
    });
}

  @Delete('images/:imageId')
  @ApiOperation({ summary: 'Remove uma imagem específica de um pet' })
  @ApiResponse({ status: 204, description: 'Imagem removida.' })
  async delete(@Param('imageId') imageId: string, @Req() req: any) {
    const userId = req.user.userId || req.user.sub;
    const userRole = req.user.role;
    
    return this.deletePetImage.execute(imageId, userId, userRole);
  }

  @Patch('images/:imageId')
  @ApiOperation({ summary: 'Atualiza (substitui) uma imagem existente' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdatePetImageSwaggerDto })
  @ApiResponse({ status: 200, description: 'Imagem atualizada com sucesso.' })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('imageId') imageId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any
  ) {
    const userId = req.user.userId || req.user.sub;
    const userRole = req.user.role;

    if (!file) throw new BadRequestException('O novo arquivo de imagem é obrigatório');

    return this.updatePetImage.execute({
      userId,
      imageId,
      fileName: file.filename,
      userRole,
    });
  }
}