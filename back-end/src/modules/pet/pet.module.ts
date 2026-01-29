import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { PetController } from './pet.controller';
import { CreatePet } from './use-cases/create-pet';
import { ListPets } from './use-cases/list-pets';
import { UpdatePet } from './use-cases/update-pet';
import { DeletePet } from './use-cases/delete-pet';

@Module({
  imports: [DatabaseModule],
  controllers: [PetController],
  providers: [
    CreatePet,
    ListPets,
    UpdatePet,
    DeletePet,
  ],
})
export class PetModule {}
