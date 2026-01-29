import { UpdatePet } from '../use-cases/update-pet';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('UpdatePet (Teste Unitário)', () => {
  let updatePet: UpdatePet;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      pet: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    updatePet = new UpdatePet(prismaMock);
  });

  it('deve atualizar o pet com sucesso se o usuário for o dono', async () => {
    const petId = 'pet-1';
    const userId = 'user-owner';
    
    prismaMock.pet.findUnique.mockResolvedValue({ id: petId, userId: userId });
    prismaMock.pet.update.mockResolvedValue({ id: petId, name: 'Novo Nome' });

    const result = await updatePet.execute(petId, { name: 'Novo Nome' }, userId);

    expect(result.name).toBe('Novo Nome');
    expect(prismaMock.pet.update).toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o pet não existir', async () => {
    prismaMock.pet.findUnique.mockResolvedValue(null);

    await expect(
      updatePet.execute('id-invalido', { name: 'Nome' }, 'any-user')
    ).rejects.toThrow(NotFoundException);
  });

  it('deve lançar ForbiddenException se o usuário não for o dono', async () => {
    const petId = 'pet-1';
    prismaMock.pet.findUnique.mockResolvedValue({ id: petId, userId: 'dono-real' });

    await expect(
      updatePet.execute(petId, { name: 'Tentativa Invasora' }, 'usuario-errado')
    ).rejects.toThrow(ForbiddenException);
    
    expect(prismaMock.pet.update).not.toHaveBeenCalled();
  });
});