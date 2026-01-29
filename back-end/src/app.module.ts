import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PetModule } from './modules/pet/pet.module';
@Module({
  imports: [DatabaseModule, AuthModule, PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}