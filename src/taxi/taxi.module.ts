import { Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxi } from './entities/taxi.entity';
import { Taxibooking } from '@/taxibooking/entities/taxibooking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taxi, Taxibooking])],
  controllers: [TaxiController],
  providers: [TaxiService],
})
export class TaxiModule {}
