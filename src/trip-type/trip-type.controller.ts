import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TripTypeService } from './trip-type.service';
import { CreateTripTypeDto } from './dto/create-trip-type.dto';
import { UpdateTripTypeDto } from './dto/update-trip-type.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('trip-type')
export class TripTypeController {
  constructor(private readonly tripTypeService: TripTypeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTripTypeDto: CreateTripTypeDto) {
    return this.tripTypeService.create(createTripTypeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.tripTypeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.tripTypeService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTripTypeDto: UpdateTripTypeDto,
  ) {
    return this.tripTypeService.update(+id, updateTripTypeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.tripTypeService.remove(+id);
  }
}
