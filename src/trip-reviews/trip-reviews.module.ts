import { Module } from '@nestjs/common';
import { TripReviewsService } from './trip-reviews.service';
import { TripReviewsController } from './trip-reviews.controller';

@Module({
  controllers: [TripReviewsController],
  providers: [TripReviewsService],
})
export class TripReviewsModule {}
