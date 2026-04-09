import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SimfaqsService } from './simfaqs.service';
import { CreateSimfaqDto } from './dto/create-simfaq.dto';
import { UpdateSimfaqDto } from './dto/update-simfaq.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('simfaqs')
export class SimfaqsController {
  constructor(private readonly simfaqsService: SimfaqsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() CreateSimfaqDto: CreateSimfaqDto) {
    return this.simfaqsService.create(CreateSimfaqDto);
  }

  @Get()
  findAll() {
    return this.simfaqsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() UpdateSimfaqDto: UpdateSimfaqDto) {
    return this.simfaqsService.update(+id, UpdateSimfaqDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.simfaqsService.remove(+id);
  }
}
