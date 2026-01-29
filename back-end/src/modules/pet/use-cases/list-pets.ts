import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class ListPets {
  constructor(private prisma: PrismaService) {}

  async execute(query?: string) {
    const pets = await this.prisma.pet.findMany({
      where: query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                ownerName: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return pets;
  }
}
