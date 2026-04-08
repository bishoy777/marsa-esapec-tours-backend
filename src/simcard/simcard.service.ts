import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Simcard } from './entities/simcard.entity';
import { CreateSimcardDto } from './dto/create-simcard.dto';

@Injectable()
export class SimcardService {
  constructor(
    @InjectRepository(Simcard)
    private simRepo: Repository<Simcard>,
  ) {}

  async create(dto: CreateSimcardDto) {
    const sim = this.simRepo.create(dto);
    return this.simRepo.save(sim);
  }

  async findAll(page = 1, perPage = 10) {
    perPage = Math.min(perPage, 50);
    const [data, total] = await this.simRepo.findAndCount({
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

  async remove(id: number) {
    const sim = await this.simRepo.findOne({ where: { id } });
    if (!sim) throw new Error('Simcard not found');

    await this.simRepo.remove(sim);
    return { message: 'Deleted successfully' };
  }
}
