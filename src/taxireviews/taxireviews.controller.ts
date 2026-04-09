// taxireviews.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { TaxireviewsService } from './taxireviews.service';
import { CreateTaxireviewDto } from './dto/create-taxireview.dto';
import { UpdateTaxireviewDto } from './dto/update-taxireview.dto';

@Controller('taxireviews')
export class TaxireviewsController {
  constructor(private readonly service: TaxireviewsService) {}

  @Post()
  create(@Body() dto: CreateTaxireviewDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaxireviewDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}