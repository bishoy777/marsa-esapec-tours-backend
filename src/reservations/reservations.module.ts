import { Module } from '@nestjs/common';
import { ReservationService } from '@/reservations/reservations.service';
import { ReservationController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Trip } from '@/trip/entities/trip.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Trip])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationsModule {}
