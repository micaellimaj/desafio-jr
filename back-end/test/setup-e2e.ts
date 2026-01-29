import { beforeAll, afterAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.pet.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});