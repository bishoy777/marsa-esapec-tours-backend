import { Module } from '@nestjs/common';
import { TripReviewsService } from './trip-reviews.service';
import { TripReviewsController } from './trip-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '@/trip/entities/trip.entity';
import { TripReview } from './entities/trip-review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TripReview, Trip])],
  controllers: [TripReviewsController],
  providers: [TripReviewsService],
})
export class TripReviewsModule {}
