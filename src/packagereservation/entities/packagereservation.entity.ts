// reservation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
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
export class packagereservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Trip, { eager: true })
  @JoinTable()
  trips: Trip[];

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  peopleCount: number;

  @Column({ nullable: true })
  hotel: string;

  @Column({ nullable: true })
  roomNumber: number;
  
  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  specialRequest: string;

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
