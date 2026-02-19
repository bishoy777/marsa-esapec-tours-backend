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
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateTaxiDto) {
    return this.taxiService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.taxiService.remove(+id);
  }
}
