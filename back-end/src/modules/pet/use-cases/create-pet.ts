import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class CreatePet {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreatePetDto, userId: string) {
    if (!userId) {
      throw new Error("ID do usuário não fornecido para o cadastro do pet");
    }

    return await this.prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        type: data.type,
        breed: data.breed,
        ownerName: data.ownerName,
        ownerContact: data.ownerContact,
        user: {
          connect: { id: userId }
        }
      },
    });
  }
}