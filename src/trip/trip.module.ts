import { Module } from '@nestjs/common';
import { Trip } from './entities/trip.entity';
import { TripImage } from '@/trip/entities/trip-image.entity';
import { TripDay } from '@/trip/entities/trip-day.entity';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from '@/packages/entities/package.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Trip, TripImage, TripDay, Package])],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService, TypeOrmModule],
})
export class TripModule {}
