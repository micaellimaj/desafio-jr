import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class CreatePet {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreatePetDto, userId: string) {
    const pet = await this.prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        type: data.type,
        breed: data.breed,
        ownerName: data.ownerName,
        ownerContact: data.ownerContact,
        userId,
      },
    });

    return pet;
  }
}
