// taxireviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiReview } from './entities/taxireview.entity';
import { TaxireviewsService } from './taxireviews.service';
import { TaxireviewsController } from './taxireviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiReview])],
  controllers: [TaxireviewsController],
  providers: [TaxireviewsService],
})
export class TaxireviewsModule {}
