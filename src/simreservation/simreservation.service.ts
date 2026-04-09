// sim-reservation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimReservation } from './entities/simreservation.entity';
import { CreateSimreservationDto } from './dto/create-simreservation.dto';
import { UpdateSimreservationDto } from './dto/update-simreservation.dto';

@Injectable()
export class SimreservationService {
  constructor(
    @InjectRepository(SimReservation)
    private readonly repo: Repository<SimReservation>,
  ) {}

  async create(dto: CreateSimreservationDto) {
    const reservation = this.repo.create(dto);
    return await this.repo.save(reservation);
  }

  async findAll() {
    return await this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const reservation = await this.repo.findOneBy({ id });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async update(id: number, dto: UpdateSimreservationDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.repo.delete(id);
  }
}
