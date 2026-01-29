import { RegisterUser } from '../use-cases/register-user';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('RegisterUser (Unitário)', () => {
  let registerUser: RegisterUser;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };
    registerUser = new RegisterUser(prismaMock);
  });

  it('deve cadastrar um novo usuário com senha criptografada', async () => {
    const dto = { name: 'Micael', email: 'test@test.com', password: 'password123' };
    
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: '1',
      ...dto,
      password: 'hashed_password',
    });

    const result = await registerUser.execute(dto);

    expect(result).not.toHaveProperty('password');
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        password: expect.not.stringMatching(dto.password),
      }),
    });
  });

  it('deve lançar ConflictException se o e-mail já existir', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: '1', email: 'already@exists.com' });

    await expect(
      registerUser.execute({ name: 'User', email: 'already@exists.com', password: '123' } as any)
    ).rejects.toThrow(ConflictException);
  });
});