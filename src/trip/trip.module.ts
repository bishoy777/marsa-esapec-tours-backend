import { Module } from '@nestjs/common';
import { Trip } from './entities/trip.entity';
import { TripImage } from '@/trip/entities/trip-image.entity';

import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Trip, TripImage])],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService, TypeOrmModule],
})
export class TripModule {}
