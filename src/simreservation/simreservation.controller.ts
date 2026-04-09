import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SimreservationService } from './simreservation.service';
import { CreateSimreservationDto } from './dto/create-simreservation.dto';
import { UpdateSimreservationDto } from './dto/update-simreservation.dto';

@Controller('simreservation')
export class SimreservationController {
  constructor(private readonly simreservationService: SimreservationService) {}

  @Post()
  create(@Body() createSimreservationDto: CreateSimreservationDto) {
    return this.simreservationService.create(createSimreservationDto);
  }

  @Get()
  findAll() {
    return this.simreservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simreservationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSimreservationDto: UpdateSimreservationDto,
  ) {
    return this.simreservationService.update(+id, updateSimreservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simreservationService.remove(+id);
  }
}
