import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../shared/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('PetController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  
  let tokenUser1: string;
  let tokenUser2: string;
  let user1Id: string;
  let petId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    jwt = app.get(JwtService);
    await app.init();

    await prisma.pet.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
      data: { email: 'u1@t.com', name: 'Usuario Um', password: 'hash_password' }
    });
    const user2 = await prisma.user.create({
      data: { email: 'u2@t.com', name: 'Usuario Dois', password: 'hash_password' }
    });

    user1Id = user1.id;

    tokenUser1 = jwt.sign({ sub: user1.id });
    tokenUser2 = jwt.sign({ sub: user2.id });
  });

  it('deve criar um pet para o usuário 1', async () => {
    const res = await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        name: 'Rex',
        age: 3,
        type: 'CACHORRO',
        breed: 'Vira-lata',
        ownerName: 'João Silva',
        ownerContact: '999999999',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    petId = res.body.id;
  });

  it('deve buscar por nome do animal ou dono (Filtro)', async () => {
    const resPet = await request(app.getHttpServer())
      .get('/pets?query=Rex')
      .set('Authorization', `Bearer ${tokenUser1}`);

    expect(resPet.status).toBe(200);
    expect(resPet.body[0].name).toBe('Rex');

    const resOwner = await request(app.getHttpServer())
      .get('/pets?query=João')
      .set('Authorization', `Bearer ${tokenUser1}`);

    expect(resOwner.status).toBe(200);
    expect(resOwner.body[0].ownerName).toContain('João');
  });

  it('deve permitir que o usuário 2 veja o pet que o usuário 1 criou (Acesso Global)', async () => {
    const response = await request(app.getHttpServer())
        .get('/pets')
        .set('Authorization', `Bearer ${tokenUser2}`);

    expect(response.status).toBe(200);
    const petDoOutro = response.body.find((p: any) => p.name === 'Rex');
    expect(petDoOutro).toBeDefined();
    });

  it('deve retornar 403 ao tentar atualizar um pet de outro usuário', async () => {
    const response = await request(app.getHttpServer())
        .patch(`/pets/${petId}`)
        .set('Authorization', `Bearer ${tokenUser2}`)
        .send({ name: 'Hackeado' });

    expect(response.status).toBe(403);
    });

  it('deve retornar 400 se o corpo da atualização estiver vazio', async () => {
    const response = await request(app.getHttpServer())
        .patch(`/pets/${petId}`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({});

    expect(response.status).toBe(400);
    });

  it('não deve permitir que usuário 2 delete o pet do usuário 1', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/pets/${petId}`)
      .set('Authorization', `Bearer ${tokenUser2}`);

    expect(res.status).toBe(403);
  });

  
  it('deve excluir o pet com sucesso e retornar 200', async () => {
    const response = await request(app.getHttpServer())
        .delete(`/pets/${petId}`)
        .set('Authorization', `Bearer ${tokenUser1}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pet removido com sucesso');

    const petAposDeletar = await prisma.pet.findUnique({ where: { id: petId } });
    expect(petAposDeletar).toBeNull();
  });

  afterAll(async () => {
    await app.close();
  });
});