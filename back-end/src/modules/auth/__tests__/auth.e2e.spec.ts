import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../shared/database/prisma.service';

describe('AuthController (E2E) - Register', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
    
    await prisma.user.deleteMany();
  });

  it('/auth/register (POST) - Sucesso', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Novo Usuário',
        email: 'novo@email.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.password).toBeUndefined();
  });

  it('/auth/register (POST) - Erro: E-mail Duplicado', async () => {
    const userData = { name: 'Dup', email: 'dup@email.com', password: 'password123' };
    
    await request(app.getHttpServer()).post('/auth/register').send(userData);
    
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userData);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Este e-mail já está cadastrado');
  });

  it('/auth/register (POST) - Erro: Nome muito curto (min 3)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Ab',
        email: 'valida@nome.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('O nome deve ter pelo menos 3 caracteres');
  });

  it('/auth/register (POST) - Erro: Senha muito curta (min 6)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Micael',
        email: 'valida@senha.com',
        password: '123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('La senha deve ter pelo menos 6 caracteres');
  });

  it('/auth/register (POST) - Erro: E-mail em formato inválido', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Micael',
        email: 'email-invalido',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('E-mail inválido');
  });

  it('/auth/login (POST) - Sucesso e estrutura do Token', async () => {
    const loginData = { email: 'login@test.com', password: 'password123' };
    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'User Login',
      ...loginData
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
  });

  it('/auth/login (POST) - Erro de Credenciais', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'naoexiste@test.com', password: '123' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciais inválidas');
  });

  afterAll(async () => {
    await app.close();
  });
});