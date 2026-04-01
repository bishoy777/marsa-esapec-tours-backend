import { Injectable } from '@nestjs/common';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '@/trip-reviews/entities/trip-review.entity';

@Injectable()
export class TripReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly tripReviewRepository: Repository<Review>,
  ) {}

  create(createTripReviewDto: CreateTripReviewDto) {
    return 'This action adds a new tripReview';
  }

  async findAll() {
    return await this.tripReviewRepository.find();
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
