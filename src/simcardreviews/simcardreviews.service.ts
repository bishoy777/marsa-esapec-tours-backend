// reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/simcardreview.entity';
import { CreateReviewDto } from './dto/create-simcardreview.dto';
import { UpdateSimcardreviewDto } from './dto/update-simcardreview.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,
  ) {}

  async create(dto: CreateReviewDto) {
    const review = this.repo.create(dto);
    return await this.repo.save(review);
  }

  async findAll() {
    return await this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, dto: UpdateSimcardreviewDto) {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return await this.repo.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return await this.repo.remove(review);
  }
}
