import { DeletePetImage } from '../use-cases/delete-pet-image';
import * as fs from 'fs';

jest.mock('fs');

describe('DeletePetImage (Unit - Success)', () => {
  let useCase: DeletePetImage;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      petImage: {
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    };
    useCase = new DeletePetImage(prismaMock);
    jest.clearAllMocks();
  });

  it('deve excluir a imagem do banco e do disco com sucesso', async () => {
    const imageId = 'img-123';
    const userId = 'user-owner';
    const mockImage = {
      id: imageId,
      url: '/uploads/dog-test.jpg',
      pet: { userId: 'user-owner' },
    };

    prismaMock.petImage.findUnique.mockResolvedValue(mockImage);
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    const result = await useCase.execute(imageId, userId, 'USER');

    expect(prismaMock.petImage.delete).toHaveBeenCalledWith({ where: { id: imageId } });
    expect(fs.unlinkSync).toHaveBeenCalled();
    expect(result.message).toBe('Imagem removida com sucesso');
  });
});