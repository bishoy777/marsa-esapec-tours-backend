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
    try {
      perPage = Math.min(perPage, 1000);
      const skip = (page - 1) * perPage;

      // 1. Create the query
      // In Postgres, 'DISTINCT ON (col)' requires 'ORDER BY col' to be the first sort criteria
      const query = this.taxiRepository
        .createQueryBuilder('taxi')
        .select('DISTINCT ON (taxi.from) taxi.from', 'from')
        .addSelect('taxi.to', 'to')
        .addSelect('taxi.sedanPrice', 'sedanPrice')
        .addSelect('taxi.HighSprice', 'HighSprice')
        .addSelect('taxi.isHotel', 'isHotel')
        .orderBy('taxi.from', 'ASC') // Required to match the DISTINCT ON column
        .limit(perPage)
        .offset(skip);

      const data = await query.getRawMany();

      // 2. Count unique 'from' values for pagination
      const countQuery = await this.taxiRepository
        .createQueryBuilder('taxi')
        .select('COUNT(DISTINCT taxi.from)', 'total')
        .getRawOne();

      const total = parseInt(countQuery.total, 10) || 0;

      return {
        data,
        pagination: {
          total,
          page,
          perPage,
        },
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw error; // This will help you see the specific SQL error in your logs
    }
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
