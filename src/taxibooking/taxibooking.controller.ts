import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaxibookingService } from './taxibooking.service';
import { CreateTaxibookingDto } from './dto/create-taxibooking.dto';

@Controller('taxibooking')
export class TaxibookingController {
  constructor(private readonly taxibookingService: TaxibookingService) {}

  @Post()
  create(@Body() createTaxibookingDto: CreateTaxibookingDto) {
    return this.taxibookingService.create(createTaxibookingDto);
  }

  @Get()
  findAll() {
    return this.taxibookingService.findAll();
  }
  @Get('taxi/:taxiId')
  findByTaxi(@Param('taxiId') taxiId: string) {
    return this.taxibookingService.findByTaxi(+taxiId);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.taxibookingService.remove(+id);
    return { message: `Taxibooking ${id} deleted successfully` };
  }
}
