import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Trip } from '@/trip/entities/trip.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatus } from './entities/reservation.entity';
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
  ) {}

  // Create reservation
  async create(dto: CreateReservationDto) {
    const trip = await this.tripRepo.findOne({ where: { id: dto.tripId } });
    if (!trip) throw new NotFoundException('Trip not found');

    const reservation = this.reservationRepo.create({
      trip,
      name: dto.name,
      phone: dto.phone,
      peopleCount: dto.peopleCount,
      date: dto.date,
      hotel: dto.hotel,
      roomNumber: dto.roomNumber,
      specialRequest: dto.specialRequest,
    });

    return this.reservationRepo.save(reservation);
  }

  // Get all reservations
  async findAll() {
    return this.reservationRepo.find({ relations: ['trip'] });
  }

  // Get reservations by trip
  async findByTrip(tripId: number) {
    return this.reservationRepo.find({
      where: { trip: { id: tripId } },
      relations: ['trip'],
    });
  }

  // Delete a reservation
  async remove(id: number) {
    const res = await this.reservationRepo.findOne({ where: { id } });
    if (!res) throw new NotFoundException('Reservation not found');
    await this.reservationRepo.remove(res);
    return { message: `Reservation ${id} deleted successfully` };
  }
  async updateStatus(id: number, status: ReservationStatus) {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.status = status;
    await this.reservationRepo.save(reservation);

    return reservation;
  }
  async search(filters: {
    status?: ReservationStatus;
    date?: string;
    tripId?: number;
    name?: string;
  }) {
    const query = this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.trip', 'trip')
      .leftJoinAndSelect('trip.tripType', 'tripType');

    if (filters.status) {
      query.andWhere('reservation.status = :status', {
        status: filters.status,
      });
    }

    if (filters.date) {
      query.andWhere('reservation.date = :date', {
        date: filters.date,
      });
    }

    if (filters.tripId) {
      query.andWhere('trip.id = :tripId', {
        tripId: filters.tripId,
      });
    }

    if (filters.name) {
      query.andWhere('reservation.name LIKE :name', {
        name: `%${filters.name}%`, // partial search
      });
    }

    return query.orderBy('reservation.date', 'ASC').getMany();
  }
  async delete(id: number) {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');
    await this.reservationRepo.remove(reservation);
    return { message: `Reservation ${id} deleted successfully` };
  }
}
