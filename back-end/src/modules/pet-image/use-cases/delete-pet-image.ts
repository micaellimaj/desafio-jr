import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class DeletePetImage {
  constructor(private prisma: PrismaService) {}

  async execute(imageId: string, userId: string) {
    const image = await this.prisma.petImage.findUnique({
      where: { id: imageId },
      include: { pet: true }
    });

    if (!image) throw new NotFoundException('Imagem não encontrada');

    // Regra de negócio: Verificação de dono
    if (image.pet.userId !== userId) {
      throw new ForbiddenException('Você não pode deletar imagens de pets de outros usuários');
    }

    // 1. Remover do Banco
    await this.prisma.petImage.delete({ where: { id: imageId } });

    // 2. Remover do Disco
    const filePath = join(__dirname, '..', '..', '..', '..', image.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { message: 'Imagem removida com sucesso' };
  }
}