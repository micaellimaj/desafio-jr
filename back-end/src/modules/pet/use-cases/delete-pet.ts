import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class DeletePet {
  constructor(private prisma: PrismaService) {}

  async execute(petId: string, userId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException('Pet não encontrado');
    }

    if (pet.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir este pet');
    }

    await this.prisma.pet.delete({
      where: { id: petId },
    });

    return { message: 'Pet removido com sucesso' };
  }
}
