import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UsePipes,
  UseGuards,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

import { CreatePet } from './use-cases/create-pet';
import { UpdatePet } from './use-cases/update-pet';
import { DeletePet } from './use-cases/delete-pet';
import { ListPets } from './use-cases/list-pets';

import { CreatePetDto, createPetSchema } from './dto/create-pet.dto';
import { UpdatePetDto, updatePetSchema } from './dto/update-pet.dto';
import { SearchPetDto, searchPetSchema, PetResponseDto } from './dto/search-pet.dto';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe';

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetController {
  constructor(
    private createPet: CreatePet,
    private updatePet: UpdatePet,
    private deletePet: DeletePet,
    private listPets: ListPets,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo pet' })
  @ApiResponse({ 
    status: 201, 
    description: 'Pet criado com sucesso.',
    type: PetResponseDto
  })
  @UsePipes(new ZodValidationPipe(createPetSchema))
  async create(@Body() data: CreatePetDto, @Req() req: any) {
    const userId = req.user?.sub || req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('ID do usuário não encontrado no token');
    }

    return this.createPet.execute(data, userId);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lista pets', 
    description: 'Filtra opcionalmente por nome do pet ou do dono via query string.' 
  })
  @ApiResponse({ 
    status: 200, 
    type: PetResponseDto, 
    isArray: true
  })
  async list(@Query() data: SearchPetDto) {
    return this.listPets.execute(data.query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um pet' })
  @ApiParam({ name: 'id', description: 'ID do pet (UUID)' })
  async update(
    @Param('id') petId: string,
    @Body() data: UpdatePetDto,
    @Req() req: Request,
  ) {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Informe ao menos um campo para atualização');
    }
    return this.updatePet.execute(petId, data, req.user['sub']);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um pet do sistema' })
  @ApiResponse({ status: 204, description: 'Pet removido com sucesso.' })
  async delete(@Param('id') petId: string, @Req() req: Request) {
    return this.deletePet.execute(petId, req.user['sub']);
  }
}
