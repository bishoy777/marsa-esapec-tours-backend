import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  ENDED = 'ended',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip, (trip) => trip.reservations, {
    onDelete: 'CASCADE',
    eager: true,
  })
  trip: Trip;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  peopleCount: number;

  @Column('date')
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;
}
