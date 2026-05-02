import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';

import { ReservationService } from '@/reservations/reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatus } from './entities/reservation.entity';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // ✅ Create
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  // ✅ Search (MUST BE BEFORE :id)
  @Get('search')
  search(
    @Query('status') status?: ReservationStatus,
    @Query('date') date?: string,
    @Query('tripId', new DefaultValuePipe(undefined), ParseIntPipe)
    tripId?: number,
  ) {
    return this.reservationService.search({ status, date, tripId });
  }

  // ✅ Pagination
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ) {
    return this.reservationService.findAll(page, perPage);
  }

  // ✅ By Trip
  @Get('trip/:tripId')
  findByTrip(@Param('tripId', ParseIntPipe) tripId: number) {
    return this.reservationService.findByTrip(tripId);
  }

  // ✅ Get One
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  // ✅ Update Status
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: ReservationStatus,
  ) {
    return this.reservationService.updateStatus(id, status);
  }

  // ✅ Delete (single clean version)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }
}
