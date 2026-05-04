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

    // 1. Fetch the distinct data sorted by the "from" column
    const data = await this.taxiRepository
      .createQueryBuilder('taxi')
      .select('DISTINCT ON (taxi.from) taxi.from', 'from')
      // If you want other columns, they must be included in the selection
      .addSelect([
        'taxi.to',
        'taxi.sedanPrice',
        'taxi.HighSprice',
        'taxi.isHotel',
      ])
      .orderBy('taxi.from', 'ASC')
      .limit(perPage)
      .offset(skip)
      .getRawMany(); // getRawMany is safer for DISTINCT results

    // 2. Calculate the total count of unique "from" locations
    const countResult = await this.taxiRepository
      .createQueryBuilder('taxi')
      .select('COUNT(DISTINCT taxi.from)', 'count')
      .getRawOne();

    const total = parseInt(countResult.count, 10);

    // 3. Return the exact same object structure as before
    return {
      data,
      pagination: {
        total,
        page,
        perPage,
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
