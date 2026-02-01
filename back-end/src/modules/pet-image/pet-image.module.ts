import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { extname } from 'path';

import { PetImageController } from './pet-image.controller';
import { UploadPetImageUseCase } from './use-cases/upload-pet-image';
import { DeletePetImage } from './use-cases/delete-pet-image';
import { UpdatePetImage } from './use-cases/update-pet-image';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const hash = randomBytes(8).toString('hex');
          const fileName = `${hash}-${Date.now()}${extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [PetImageController],
  providers: [
    UploadPetImageUseCase, 
    DeletePetImage, 
    UpdatePetImage
  ],
  exports: [
    UploadPetImageUseCase,
  ]
})
export class PetImageModule {}