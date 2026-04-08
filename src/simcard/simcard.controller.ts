import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { SimcardService } from './simcard.service';
import { CreateSimcardDto } from './dto/create-simcard.dto';

@Controller('simcards')
export class SimcardController {
  constructor(private readonly simService: SimcardService) {}

  @Post()
  create(@Body() dto: CreateSimcardDto) {
    return this.simService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    return this.simService.findAll(+page, +perPage);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.simService.remove(+id);
  }
}
