import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PetModule } from './modules/pet/pet.module';
import { PetImageModule } from './modules/pet-image/pet-image.module'
@Module({
  imports: [DatabaseModule, AuthModule, PetModule, PetImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}