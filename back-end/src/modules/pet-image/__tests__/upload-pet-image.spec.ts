import { UploadPetImageUseCase } from '../use-cases/upload-pet-image';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('UploadPetImageUseCase (Teste Unitário)', () => {
  let useCase: UploadPetImageUseCase;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      pet: { findUnique: jest.fn() },
      petImage: { create: jest.fn() },
    };
    useCase = new UploadPetImageUseCase(prismaMock);
  });

  it('deve permitir o upload de imagem se o usuário for o dono do pet', async () => {
    const data = { userId: 'user-1', petId: 'pet-1', fileName: 'dog.jpg' };
    
    prismaMock.pet.findUnique.mockResolvedValue({ id: 'pet-1', userId: 'user-1' });
    prismaMock.petImage.create.mockResolvedValue({ id: 'img-1', url: '/uploads/dog.jpg' });

    const result = await useCase.execute(data);

    expect(result.url).toBe('/uploads/dog.jpg');
    expect(prismaMock.petImage.create).toHaveBeenCalled();
  });

  it('deve retornar 404 se o pet não existir', async () => {
    prismaMock.pet.findUnique.mockResolvedValue(null);

    await expect(useCase.execute({ userId: 'u1', petId: 'invalid', fileName: 'f.jpg' }))
      .rejects.toThrow(NotFoundException);
  });

  it('deve retornar 403 se o pet pertencer a outro usuário', async () => {
    prismaMock.pet.findUnique.mockResolvedValue({ id: 'pet-1', userId: 'outro-usuario' });

    await expect(useCase.execute({ userId: 'meu-id', petId: 'pet-1', fileName: 'f.jpg' }))
      .rejects.toThrow(ForbiddenException);
  });
});