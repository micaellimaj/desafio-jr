import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { RegisterUser } from './use-cases/register-user';
import { LoginUser } from './use-cases/login-user';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUser, LoginUser, JwtStrategy],
  exports: [LoginUser],
})
export class AuthModule {}