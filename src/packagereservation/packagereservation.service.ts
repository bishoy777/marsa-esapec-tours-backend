// reservation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { packagereservation } from './entities/packagereservation.entity';
import { Repository } from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';
import { CreatepackagereservationDto } from './dto/create-packagereservation.dto';
import { UpdatepackagereservationDto } from './dto/update-packagereservation.dto';

@Injectable()
export class packagereservationService {
  constructor(
    @InjectRepository(packagereservation)
    private reservationRepo: Repository<packagereservation>,

    @InjectRepository(Trip)
    private tripRepo: Repository<Trip>,
  ) {}

  // CREATE
  async create(dto: CreatepackagereservationDto) {
    const trips = await this.tripRepo.find({
      where: dto.tripIds.map((id) => ({ id })),
    });

    if (!trips.length) {
      throw new NotFoundException('Trips not found');
    }

    const reservation = this.reservationRepo.create({
      ...dto,
      trips,
    });

    return await this.reservationRepo.save(reservation);
  }

  // FIND ALL
  async findAll() {
    return await this.reservationRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  // FIND ONE
  async findOne(id: number) {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  // UPDATE
  async update(id: number, dto: UpdatepackagereservationDto) {
    const reservation = await this.findOne(id);

    let trips = reservation.trips;

    if (dto.tripIds) {
      trips = await this.tripRepo.find({
        where: dto.tripIds.map((id) => ({ id })),
      });
    }

    Object.assign(reservation, {
      ...dto,
      trips,
    });

    return await this.reservationRepo.save(reservation);
  }

  // DELETE
  async remove(id: number) {
    const reservation = await this.findOne(id);
    return await this.reservationRepo.remove(reservation);
  }
}