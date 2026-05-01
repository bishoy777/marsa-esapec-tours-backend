import { Module } from '@nestjs/common';
import { packagereservationService } from './packagereservation.service';
import { packagereservationController } from './packagereservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '@/trip/entities/trip.entity';
import { packagereservation } from './entities/packagereservation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([packagereservation, Trip])],
  controllers: [packagereservationController],
  providers: [packagereservationService],
})
export class PackagereservationModule {}
