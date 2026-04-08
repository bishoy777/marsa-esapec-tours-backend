import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { ReservationService } from '@/reservations/reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatus } from './entities/reservation.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Create reservation
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  // Get all reservations (admin)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ) {
    return this.reservationService.findAll(+page, +perPage);
  }

  // Get reservations for a specific trip
  @Get('trip/:tripId')
  findByTrip(@Param('tripId') tripId: string) {
    return this.reservationService.findByTrip(+tripId);
  }

  // Delete reservation
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: ReservationStatus,
  ) {
    return this.reservationService.updateStatus(+id, status);
  }
  @Get('search')
  async search(
    @Query('status') status?: ReservationStatus,
    @Query('date') date?: string,
    @Query('tripId') tripId?: number,
  ) {
    return this.reservationService.search({ status, date, tripId });
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.reservationService.delete(+id);
  }
}
