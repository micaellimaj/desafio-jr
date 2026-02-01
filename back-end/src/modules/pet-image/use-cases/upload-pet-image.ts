import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { UploadPetImageDto } from '../dto/upload-pet-image.dto';

@Injectable()
export class UploadPetImageUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: UploadPetImageDto) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: data.petId },
    });

    if (!pet) throw new NotFoundException('Pet não encontrado.');

    if (pet.userId !== data.userId) {
      throw new ForbiddenException('Você não tem permissão para este pet.');
    }

    return await this.prisma.petImage.create({
      data: {
        petId: data.petId,
        url: `/uploads/${data.fileName}`, 
      },
    });
  }
}