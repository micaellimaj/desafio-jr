import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

interface UpdatePetImageRequest {
  userId: string;
  imageId: string;
  newFileName: string;
}

@Injectable()
export class UpdatePetImage {
  constructor(private prisma: PrismaService) {}

  async execute({ userId, imageId, newFileName }: UpdatePetImageRequest) {
 
    const currentImage = await this.prisma.petImage.findUnique({
      where: { id: imageId },
      include: { pet: true },
    });

    if (!currentImage) {
      throw new NotFoundException('Imagem não encontrada.');
    }

    if (currentImage.pet.userId !== userId) {
      
      const tempPath = join(__dirname, '..', '..', '..', '..', 'uploads', newFileName);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      
      throw new ForbiddenException('Você não tem permissão para alterar esta imagem.');
    }

    const oldPath = join(__dirname, '..', '..', '..', '..', currentImage.url);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    const updatedImage = await this.prisma.petImage.update({
      where: { id: imageId },
      data: {
        url: `/uploads/${newFileName}`,
      },
    });

    return updatedImage;
  }
}