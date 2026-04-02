import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripReview } from '@/trip-reviews/entities/trip-review.entity';
import { Trip } from '@/trip/entities/trip.entity';

@Injectable()
export class TripReviewsService {
  constructor(
    @InjectRepository(TripReview)
    private readonly tripReviewRepository: Repository<TripReview>,

    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  // ✅ CREATE REVIEW
  async create(dto: CreateTripReviewDto) {
    const trip = await this.tripRepository.findOne({
      where: { id: dto.tripId },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const review = this.tripReviewRepository.create({
      userName: dto.userName,
      comment: dto.comment,
      rating: dto.rating,
      trip,
    });

    return await this.tripReviewRepository.save(review);
  }

  // ✅ GET ALL REVIEWS
  async findAll() {
    return await this.tripReviewRepository.find({
      relations: ['trip'], // optional
    });
  }

  // ✅ GET ONE REVIEW
  async findOne(id: number) {
    const review = await this.tripReviewRepository.findOne({
      where: { id },
      relations: ['trip'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: number, dto: UpdateTripReviewDto) {
    const review = await this.tripReviewRepository.findOne({
      where: { id },
      relations: ['trip'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Handle trip update separately
    if (dto.tripId) {
      const trip = await this.tripRepository.findOne({
        where: { id: dto.tripId },
      });

      if (!trip) {
        throw new NotFoundException('Trip not found');
      }

      review.trip = trip;
    }

    // Remove tripId before assigning (important!)
    const { tripId, ...rest } = dto;

    // Update remaining fields (including status)
    Object.assign(review, rest);

    return await this.tripReviewRepository.save(review);
  }
  // ✅ DELETE REVIEW
  async remove(id: number) {
    const review = await this.tripReviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }
    await this.tripReviewRepository.remove(review);

    return {
      message: 'Review deleted successfully',
    };
  }
}
