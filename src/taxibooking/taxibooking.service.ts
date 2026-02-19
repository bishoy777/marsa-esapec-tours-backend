import { Injectable } from '@nestjs/common';
import { CreateTaxibookingDto } from './dto/create-taxibooking.dto';
import { UpdateTaxibookingDto } from './dto/update-taxibooking.dto';
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

  findAll() {
    return this.taxibookingRepo.find({ relations: ['taxi'] });
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
