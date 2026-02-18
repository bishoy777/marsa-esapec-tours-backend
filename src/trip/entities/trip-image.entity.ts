import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';

@Entity()
export class TripImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Trip, (trip) => trip.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tripId' }) // explicitly name FK column
  trip: Trip;
}
