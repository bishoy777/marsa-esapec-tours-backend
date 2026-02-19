import { Module } from '@nestjs/common';
import { TaxibookingService } from './taxibooking.service';
import { TaxibookingController } from './taxibooking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxibooking } from './entities/taxibooking.entity';
import { Taxi } from '@/taxi/entities/taxi.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Taxibooking, Taxi])],
  controllers: [TaxibookingController],
  providers: [TaxibookingService],
  
})
export class TaxibookingModule {}
