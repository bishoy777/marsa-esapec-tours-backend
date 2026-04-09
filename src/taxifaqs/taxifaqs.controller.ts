import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxifaqsService } from './taxifaqs.service';
import { CreateTaxifaqDto } from './dto/create-taxifaq.dto';
import { UpdateTaxifaqDto } from './dto/update-taxifaq.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('taxifaqs')
export class TaxifaqsController {
  constructor(private readonly taxifaqsService: TaxifaqsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() CreateTaxifaqDto: CreateTaxifaqDto) {
    return this.taxifaqsService.create(CreateTaxifaqDto);
  }

  @Get()
  findAll() {
    return this.taxifaqsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() UpdateTaxifaqDto: UpdateTaxifaqDto) {
    return this.taxifaqsService.update(+id, UpdateTaxifaqDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.taxifaqsService.remove(+id);
  }
}
