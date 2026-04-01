import { Injectable } from '@nestjs/common';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';

@Injectable()
export class TripReviewsService {
  create(createTripReviewDto: CreateTripReviewDto) {
    return 'This action adds a new tripReview';
  }

  findAll() {
    return `This action returns all tripReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tripReview`;
  }

  update(id: number, updateTripReviewDto: UpdateTripReviewDto) {
    return `This action updates a #${id} tripReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} tripReview`;
  }
}
