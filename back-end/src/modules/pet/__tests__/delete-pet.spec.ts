import { DeletePet } from '../use-cases/delete-pet';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('DeletePet (Teste Unitário)', () => {
  let deletePet: DeletePet;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      pet: {
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    };
    deletePet = new DeletePet(prismaMock);
  });

  it('deve remover o pet com sucesso se for o dono', async () => {
    const petId = 'pet-id';
    const userId = 'dono-id';

    prismaMock.pet.findUnique.mockResolvedValue({ id: petId, userId });
    prismaMock.pet.delete.mockResolvedValue({});

    const result = await deletePet.execute(petId, userId);

    expect(result).toEqual({ message: 'Pet removido com sucesso' });
    expect(prismaMock.pet.delete).toHaveBeenCalledWith({ where: { id: petId } });
  });

  it('deve lançar ForbiddenException se outro usuário tentar deletar', async () => {
    const petId = 'pet-id';
    prismaMock.pet.findUnique.mockResolvedValue({ id: petId, userId: 'dono-real' });

    await expect(
      deletePet.execute(petId, 'usuario-invasor')
    ).rejects.toThrow(ForbiddenException);

    expect(prismaMock.pet.delete).not.toHaveBeenCalled();
  });
});