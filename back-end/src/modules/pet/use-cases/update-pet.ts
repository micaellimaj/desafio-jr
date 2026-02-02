import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UpdatePet {
  constructor(private prisma: PrismaService) {}

  async execute(petId: string, data: UpdatePetDto, userId: string, userRole: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException('Pet não encontrado');
    }

    if (pet.userId !== userId && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Você não tem permissão para editar este pet');
    }

    const updatedPet = await this.prisma.pet.update({
      where: { id: petId },
      data,
    });

    return updatedPet;
  }
}