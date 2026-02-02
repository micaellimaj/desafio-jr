import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { Role } from '@prisma/client';

@Injectable()
export class DeletePetImage {
  constructor(private prisma: PrismaService) {}

  async execute(imageId: string, userId: string, userRole: string) {
    const image = await this.prisma.petImage.findUnique({
      where: { id: imageId },
      include: { pet: true }
    });

    if (!image) throw new NotFoundException('Imagem não encontrada');

    if (image.pet.userId !== userId && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Você não pode deletar imagens de pets de outros usuários');
    }

    await this.prisma.petImage.delete({ where: { id: imageId } });

    const filePath = join(process.cwd(), 'uploads', image.url.replace('/uploads/', ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { message: 'Imagem removida com sucesso' };
  }
}