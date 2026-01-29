import { ListPets } from '../use-cases/list-pets';

describe('ListPets (Teste Unitário)', () => {
  let listPets: ListPets;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      pet: {
        findMany: jest.fn(),
      },
    };
    listPets = new ListPets(prismaMock);
  });

  it('deve chamar o prisma com filtros OR quando uma query for fornecida', async () => {
    const query = 'Rex';
    await listPets.execute(query);

    expect(prismaMock.pet.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { ownerName: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('deve chamar o prisma sem filtros quando a query for nula ou vazia', async () => {
    await listPets.execute();

    expect(prismaMock.pet.findMany).toHaveBeenCalledWith({
      where: undefined,
      orderBy: { createdAt: 'desc' },
    });
  });
});