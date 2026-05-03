import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(Taxi)
    private taxiRepository: Repository<Taxi>,
  ) {}

  create(dto: CreateTaxiDto) {
    const taxi = this.taxiRepository.create(dto);
    return this.taxiRepository.save(taxi);
  }

  async findAll(page = 1, perPage = 10) {
    perPage = Math.min(perPage, 1000);
    const skip = (page - 1) * perPage;

    // 1. Create a QueryBuilder to handle DISTINCT on multiple columns
    const queryBuilder = this.taxiRepository
      .createQueryBuilder('taxi')
      .select([
        'taxi.from',
        'taxi.to',
        'taxi.sedanPrice',
        'taxi.HighSprice',
        'taxi.isHotel',
      ])
      .distinct(true) // Ensures the entire row combination is unique
      .orderBy('taxi.from', 'ASC')
      .skip(skip)
      .take(perPage);

    // 2. Execute the query
    const data = await queryBuilder.getMany();

    // 3. Get the total count of unique rows for the pagination metadata
    // Note: getCount() with distinct can be heavy, so we use a subquery for accuracy
    const total = await this.taxiRepository
      .createQueryBuilder('taxi')
      .select('DISTINCT taxi.from, taxi.to')
      .getCount();

    return {
      data,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  findOne(id: number) {
    return this.taxiRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateTaxiDto) {
    const taxi = await this.taxiRepository.findOne({ where: { id } });

    if (!taxi) {
      throw new NotFoundException(`Taxi with id ${id} not found`);
    }

    Object.assign(taxi, dto);
    return this.taxiRepository.save(taxi);
  }

  async remove(id: number) {
    await this.taxiRepository.delete(id);
    return { message: `Taxi ${id} deleted successfully` };
  }
}
