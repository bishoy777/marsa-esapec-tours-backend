// taxireviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiReview } from './entities/taxireview.entity';
import { CreateTaxireviewDto } from './dto/create-taxireview.dto';
import { UpdateTaxireviewDto } from './dto/update-taxireview.dto';

@Injectable()
export class TaxireviewsService {
  constructor(
    @InjectRepository(TaxiReview)
    private repo: Repository<TaxiReview>,
  ) {}

  async create(dto: CreateTaxireviewDto) {
    const review = this.repo.create(dto);
    return this.repo.save(review);
  }

  async findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const review = await this.repo.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Taxi review not found');
    return review;
  }

  async update(id: number, dto: UpdateTaxireviewDto) {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.repo.save(review);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return this.repo.remove(review);
  }
}