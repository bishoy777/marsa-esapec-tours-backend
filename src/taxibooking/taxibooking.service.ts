import { Injectable } from '@nestjs/common';
import { CreateTaxibookingDto } from './dto/create-taxibooking.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxibooking } from './entities/taxibooking.entity';
import { Taxi } from '@/taxi/entities/taxi.entity';

@Injectable()
export class TaxibookingService {
  constructor(
    @InjectRepository(Taxibooking)
    private readonly taxibookingRepo: Repository<Taxibooking>,
    @InjectRepository(Taxi)
    private readonly taxiRepo: Repository<Taxi>,
  ) {}
  async create(createTaxibookingDto: CreateTaxibookingDto) {
    const Taxibooking = await this.taxiRepo.findOne({
      where: { id: createTaxibookingDto.taxiId },
    });
    if (!Taxibooking) {
      throw new Error('Taxi not found');
    }
    const booking = this.taxibookingRepo.create({
      ...createTaxibookingDto,
      taxi: Taxibooking,
    });
    console.log(booking);
    return this.taxibookingRepo.save(booking);
  }

  async findAll(page = 1, perPage = 10) {
    perPage = Math.min(perPage, 50);
    const [data, total] = await this.taxibookingRepo.findAndCount({
      relations: ['taxi'],
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return {
      data,
      pagination: {
        total,
        page,
        perPage,
      },
    };
  }

  async findByTaxi(taxiId: number) {
    return await this.taxibookingRepo.find({
      where: {
        taxi: { id: taxiId }, // ✅ relation filter
      },
      order: {
        createdAt: 'DESC', // optional but useful
      },
    });
  }
  remove(id: number) {
    return this.taxibookingRepo.delete(id);
  }
}
