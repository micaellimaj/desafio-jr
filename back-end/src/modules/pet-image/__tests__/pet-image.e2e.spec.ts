import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('PetImage - Casos Negativos (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let tokenUser2: string;
  let petIdFromUser1: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    jwt = app.get(JwtService);
    await app.init();

    const u1 = await prisma.user.create({ data: { email: 'u1@err.com', name: 'Dono', password: '1' } });
    const u2 = await prisma.user.create({ data: { email: 'u2@err.com', name: 'Invasor', password: '1' } });
    
    const pet = await prisma.pet.create({
      data: { name: 'Vítima', age: 1, type: 'GATO', breed: 'SRD', ownerName: 'D', ownerContact: '1', userId: u1.id }
    });

    petIdFromUser1 = pet.id;
    tokenUser2 = jwt.sign({ sub: u2.id });
  });

  it('deve retornar 403 ao tentar upload em pet de outro usuário', async () => {
    const res = await request(app.getHttpServer())
      .post(`/pets/${petIdFromUser1}/images`)
      .set('Authorization', `Bearer ${tokenUser2}`)
      .attach('file', Buffer.from('fake'), 'hack.jpg');

    expect(res.status).toBe(403);
    expect(res.body.message).toContain('permissão');
  });

  it('deve retornar 404 ao tentar atualizar imagem inexistente', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/pets/images/uuid-nao-existe`)
      .set('Authorization', `Bearer ${tokenUser2}`)
      .attach('file', Buffer.from('fake'), 'new.jpg');

    expect(res.status).toBe(404);
  });

  it('deve retornar 401 se o token JWT não for enviado', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/pets/images/qualquer-id`);

    expect(res.status).toBe(401);
  });

  it('deve retornar 403 ao tentar deletar imagem de um pet que não é seu', async () => {
    const image = await prisma.petImage.create({
      data: {
        petId: petIdFromUser1,
        url: '/uploads/secure-image.jpg'
      }
    });

    const res = await request(app.getHttpServer())
      .delete(`/pets/images/${image.id}`)
      .set('Authorization', `Bearer ${tokenUser2}`);

    expect(res.status).toBe(403);
    expect(res.body.message).toContain('Você não pode deletar imagens');

    const stillExists = await prisma.petImage.findUnique({ where: { id: image.id } });
    expect(stillExists).toBeDefined();
  });

  it('deve retornar 404 ao tentar deletar uma imagem que não existe', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/pets/images/uuid-inexistente`)
      .set('Authorization', `Bearer ${tokenUser2}`); 
    expect(res.status).toBe(404);
  });

  afterAll(async () => {
    await prisma.petImage.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });
});