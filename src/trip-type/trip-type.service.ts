import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripTypeDto } from './dto/create-trip-type.dto';
import { UpdateTripTypeDto } from './dto/update-trip-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripType } from '@/trip-type/entities/trip-type.entity';
@Injectable()
export class TripTypeService {
  constructor(
    @InjectRepository(TripType)
    private readonly tripTypeRepository: Repository<TripType>,
  ) {}
  async create(createTripTypeDto: CreateTripTypeDto) {
    const tripType = this.tripTypeRepository.create(createTripTypeDto);
    return await this.tripTypeRepository.save(tripType);
  }

  async findAll() {
    return await this.tripTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.tripTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTripTypeDto: UpdateTripTypeDto) {
    const tripType = await this.tripTypeRepository.findOneBy({ id });

    if (!tripType) {
      throw new NotFoundException(`Trip type with id ${id} not found`);
    }

    // Merge updated fields
    Object.assign(tripType, updateTripTypeDto);

    return await this.tripTypeRepository.save(tripType);
  }

  async remove(id: number) {
    const tripType = await this.tripTypeRepository.findOneBy({ id });

    if (!tripType) {
      throw new NotFoundException(`Trip type with id ${id} not found`);
    }

    await this.tripTypeRepository.remove(tripType);

    return { message: 'Trip type deleted successfully' };
  }
}
