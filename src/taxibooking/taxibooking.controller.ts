import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxibookingService } from './taxibooking.service';
import { CreateTaxibookingDto } from './dto/create-taxibooking.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('taxibooking')
export class TaxibookingController {
  constructor(private readonly taxibookingService: TaxibookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTaxibookingDto: CreateTaxibookingDto) {
    return this.taxibookingService.create(createTaxibookingDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    return this.taxibookingService.findAll(+page, +perPage);
  }
  @Get('taxi/:taxiId')
  findByTaxi(@Param('taxiId') taxiId: string) {
    return this.taxibookingService.findByTaxi(+taxiId);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.taxibookingService.remove(+id);
    return { message: `Taxibooking ${id} deleted successfully` };
  }
}
