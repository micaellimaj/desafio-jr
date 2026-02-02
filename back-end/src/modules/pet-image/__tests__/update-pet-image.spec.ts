import { UpdatePetImage } from '../use-cases/update-pet-image';
import * as fs from 'fs';

jest.mock('fs');

describe('UpdatePetImage (Teste Unitário)', () => {
  let useCase: UpdatePetImage;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      petImage: { findUnique: jest.fn(), update: jest.fn() },
    };
    useCase = new UpdatePetImage(prismaMock);
    jest.clearAllMocks();
  });

  it('deve apagar o arquivo antigo e atualizar o banco com o novo', async () => {
    const mockImage = { 
      id: 'img-1', 
      url: '/uploads/velha.jpg', 
      pet: { userId: 'user-1' } 
    };
    
    prismaMock.petImage.findUnique.mockResolvedValue(mockImage);
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    await useCase.execute({ userId: 'user-1', imageId: 'img-1', fileName: 'nova.jpg', userRole: 'USER'});

    expect(fs.unlinkSync).toHaveBeenCalled();
    expect(prismaMock.petImage.update).toHaveBeenCalledWith({
      where: { id: 'img-1' },
      data: { url: '/uploads/nova.jpg' }
    });
  });
});