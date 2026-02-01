import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

interface UploadPetImageRequest {
  userId: string;
  petId: string;
  fileName: string;
}

@Injectable()
export class UploadPetImageUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({ userId, petId, fileName }: UploadPetImageRequest) {
    // 1. Verificar se o pet existe
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!pet) {
      throw new NotFoundException('Pet não encontrado.');
    }

    // 2. Regra de Negócio: O pet pertence ao usuário logado?
    if (pet.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para adicionar imagens a este pet.');
    }

    // 3. Salvar a referência da imagem no banco
    // O caminho 'uploads/...' deve bater com o que seu controller salvar no disco
    const image = await this.prisma.petImage.create({
      data: {
        petId: petId,
        url: `/uploads/${fileName}`, 
      },
    });

    return image;
  }
}