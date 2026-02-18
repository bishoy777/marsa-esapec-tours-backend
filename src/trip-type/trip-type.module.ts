import { Module } from '@nestjs/common';
import { TripTypeService } from './trip-type.service';
import { TripTypeController } from './trip-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripType } from '@/trip-type/entities/trip-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripType])],
  controllers: [TripTypeController],
  providers: [TripTypeService],
})
export class TripTypeModule {}
