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
  BadRequestException
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

import { CreatePet } from './use-cases/create-pet';
import { UpdatePet } from './use-cases/update-pet';
import { DeletePet } from './use-cases/delete-pet';
import { ListPets } from './use-cases/list-pets';

import { CreatePetDto, createPetSchema } from './dto/create-pet.dto';
import { UpdatePetDto, updatePetSchema } from './dto/update-pet.dto';
import { SearchPetDto, searchPetSchema } from './dto/search-pet.dto';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe';

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
  @UsePipes(new ZodValidationPipe(createPetSchema))
  async create(@Body() data: CreatePetDto, @Req() req: Request) {
    return this.createPet.execute(data, req.user['sub']);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(searchPetSchema))
    async list(@Query() data: SearchPetDto) {
      return this.listPets.execute(data.query);
  }

  @Patch(':id')
async update(
  @Param('id') petId: string,
  @Body() data: UpdatePetDto,
  @Req() req: Request,
) {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestException(
      'Informe ao menos um campo para atualização',
    );
  }

  return this.updatePet.execute(petId, data, req.user['sub']);
}


  @Delete(':id')
  async delete(@Param('id') petId: string, @Req() req: Request) {
    return this.deletePet.execute(petId, req.user['sub']);
  }
}
