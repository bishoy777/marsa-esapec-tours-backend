import { Module } from '@nestjs/common';
import { SimreservationService } from './simreservation.service';
import { SimreservationController } from './simreservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimReservation } from './entities/simreservation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SimReservation])],
  controllers: [SimreservationController],
  providers: [SimreservationService],
})
export class SimreservationModule {}
