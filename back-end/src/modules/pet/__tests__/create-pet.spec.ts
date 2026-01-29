import { CreatePet } from '../use-cases/create-pet';
import { CreatePetDto } from '../dto/create-pet.dto';

describe('CreatePet (Teste Unitário)', () => {
  let createPet: CreatePet;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      pet: {
        create: jest.fn(),
      },
    };
    createPet = new CreatePet(prismaMock);
  });

  it('deve chamar o prisma com os dados corretos e retornar o pet criado', async () => {
    const dto: CreatePetDto = {
      name: 'Bidu',
      age: 5,
      type: 'CACHORRO',
      breed: 'Poodle',
      ownerName: 'Carlos',
      ownerContact: '1199999999',
    };
    const userId = 'user-uuid-123';

    const mockCreatedPet = { id: 'pet-uuid-456', ...dto, userId, createdAt: new Date() };
    prismaMock.pet.create.mockResolvedValue(mockCreatedPet);

    const result = await createPet.execute(dto, userId);

    expect(prismaMock.pet.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        userId,
      },
    });
    expect(result).toEqual(mockCreatedPet);
    expect(result.name).toBe('Bidu');
  });
});
