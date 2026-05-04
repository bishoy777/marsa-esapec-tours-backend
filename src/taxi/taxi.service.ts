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

      // We use selectRaw for the first column to force DISTINCT ON to the front
      const data = await this.taxiRepository
        .createQueryBuilder('taxi')
        .select('DISTINCT ON ("taxi"."from") "taxi"."from"', 'from')
        .addSelect('"taxi"."to"', 'to')
        .addSelect('"taxi"."sedanPrice"', 'sedanPrice')
        .addSelect('"taxi"."HighSprice"', 'HighSprice')
        .addSelect('"taxi"."isHotel"', 'isHotel')
        .orderBy('"taxi"."from"', 'ASC')
        .limit(perPage)
        .offset(skip)
        .getRawMany();

      // Count unique 'from' values
      const countResult = await this.taxiRepository
        .createQueryBuilder('taxi')
        .select('COUNT(DISTINCT "taxi"."from")', 'total')
        .getRawOne();

      const total = parseInt(countResult.total, 10) || 0;

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
      throw error;
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
