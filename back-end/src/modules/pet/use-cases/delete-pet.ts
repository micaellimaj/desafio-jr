import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import * as fs from 'fs';
import { join } from 'path';
import { Role } from '@prisma/client';

@Injectable()
export class DeletePet {
  constructor(private prisma: PrismaService) {}

  async execute(petId: string, userId: string, userRole: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      include: { images: true },
    });

    if (!pet) {
      throw new NotFoundException('Pet não encontrado');
    }

    if (pet.userId !== userId && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Você não tem permissão para excluir este pet');
    }

    if (pet.images && pet.images.length > 0) {
      pet.images.forEach((image) => {
        const filePath = join(__dirname, '..', '..', '..', '..', image.url);
        
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error(`Erro ao deletar arquivo: ${filePath}`, err);
          }
        }
      });
    }

    await this.prisma.pet.delete({
      where: { id: petId },
    });

    return { message: 'Pet e suas imagens foram removidos com sucesso' };
  }
}