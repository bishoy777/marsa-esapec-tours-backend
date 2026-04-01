import { Module } from '@nestjs/common';
import { TripReviewsService } from './trip-reviews.service';
import { TripReviewsController } from './trip-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripReview } from './entities/trip-review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TripReview])],
  controllers: [TripReviewsController],
  providers: [TripReviewsService],
})
export class TripReviewsModule {}
