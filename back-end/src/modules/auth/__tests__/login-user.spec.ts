import { LoginUser } from '../use-cases/login-user';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('LoginUser (Unitário)', () => {
  let loginUser: LoginUser;
  let prismaMock: any;
  let jwtServiceMock: any;

  beforeEach(() => {
    prismaMock = { user: { findUnique: jest.fn() } };
    jwtServiceMock = { signAsync: jest.fn() };
    loginUser = new LoginUser(prismaMock, jwtServiceMock);
  });

  it('deve retornar access_token e dados do usuário no login bem-sucedido', async () => {
    const user = { id: '1', email: 'test@t.com', name: 'User', password: 'hashed_password' };
    prismaMock.user.findUnique.mockResolvedValue(user);
    
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    jwtServiceMock.signAsync.mockResolvedValue('mocked_token');

    const result = await loginUser.execute({ email: 'test@t.com', password: 'correct_password' });

    expect(result).toHaveProperty('access_token', 'mocked_token');
    expect(result.user.name).toBe('User');
  });

  it('deve lançar UnauthorizedException se o e-mail não for encontrado', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(
      loginUser.execute({ email: 'wrong@t.com', password: '123' })
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ password: 'hashed_password' });
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(
      loginUser.execute({ email: 'test@t.com', password: 'wrong_password' })
    ).rejects.toThrow(UnauthorizedException);
  });
});