import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUser } from './use-cases/register-user';
import { RegisterDto, registerSchema } from './dto/register.dto';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe';
import { LoginUser } from './use-cases/login-user';
import { LoginDto, loginSchema } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Cria uma nova conta de usuário' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() data: RegisterDto) {
    return this.registerUser.execute(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica o usuário e retorna um token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Token gerado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() data: LoginDto) {
    return this.loginUser.execute(data);
  }
}