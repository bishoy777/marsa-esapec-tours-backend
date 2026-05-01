import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { packagereservationService } from './packagereservation.service';
import { CreatepackagereservationDto } from './dto/create-packagereservation.dto';
import { UpdatepackagereservationDto } from './dto/update-packagereservation.dto';

@Controller('packagereservation')
export class packagereservationController {
  constructor(
    private readonly packagereservationService: packagereservationService,
  ) {}

  @Post()
  create(
    @Body()
    CreatepackagereservationDto: CreatepackagereservationDto,
  ) {
    return this.packagereservationService.create(CreatepackagereservationDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    return this.packagereservationService.findAll(+page, +perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagereservationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePackagereservationDto: UpdatepackagereservationDto,
  ) {
    return this.packagereservationService.update(
      +id,
      updatePackagereservationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagereservationService.remove(+id);
  }
}
