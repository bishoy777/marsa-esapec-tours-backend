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

  findAll() {
    return this.taxiRepository.find();
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
