import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { UpdatePetImageDto } from '../dto/update-pet-image.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UpdatePetImage {
  constructor(private prisma: PrismaService) {}

  async execute(data: UpdatePetImageDto) {
    const currentImage = await this.prisma.petImage.findUnique({
      where: { id: data.imageId },
      include: { pet: true },
    });

    if (!currentImage) {

      this.deletePhysicalFile(data.fileName);
      throw new NotFoundException('Imagem não encontrada.');
    }

    if (currentImage.pet.userId !== data.userId) {
      this.deletePhysicalFile(data.fileName);
      throw new ForbiddenException('Sem permissão para alterar esta imagem.');
    }

    const oldFileName = currentImage.url.replace('/uploads/', '');
    this.deletePhysicalFile(oldFileName);

    return await this.prisma.petImage.update({
      where: { id: data.imageId },
      data: { 
        url: `/uploads/${data.fileName}` 
      },
    });
  }

  private deletePhysicalFile(fileName: string) {
    const filePath = join(process.cwd(), 'uploads', fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Erro ao remover arquivo: ${filePath}`, err);
      }
    }
  }
}