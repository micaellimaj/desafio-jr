import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { RegisterUser } from './use-cases/register-user';
import { RegisterDto, registerSchema } from './dto/register.dto';
import { ZodValidationPipe } from './dto/zod-validation.pipe';
import { LoginUser } from './use-cases/login-user';
import { LoginDto, loginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() data: RegisterDto) {
    return this.registerUser.execute(data);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() data: LoginDto) {
    return this.loginUser.execute(data);
  }
}