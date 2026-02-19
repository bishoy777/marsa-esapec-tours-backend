import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  @Post()
  create(@Body() dto: CreateTaxiDto) {
    return this.taxiService.create(dto);
  }

  @Get()
  findAll() {
    return this.taxiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaxiDto) {
    return this.taxiService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxiService.remove(+id);
  }
}
