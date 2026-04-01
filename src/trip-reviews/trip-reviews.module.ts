import { Module } from '@nestjs/common';
import { TripReviewsService } from './trip-reviews.service';
import { TripReviewsController } from './trip-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/trip-review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [TripReviewsController],
  providers: [TripReviewsService],
})
export class TripReviewsModule {}
