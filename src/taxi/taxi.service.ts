import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';
import { ILike } from 'typeorm';

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

  async findAll(page = 1, perPage = 10, search?: string) {
    perPage = Math.min(perPage, 1000);
    const whereCondition = search ? { from: ILike(`%${search}%`) } : {};
    const [data, total] = await this.taxiRepository.findAndCount({
      where: whereCondition,
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
