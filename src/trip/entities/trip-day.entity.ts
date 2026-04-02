import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';

@Entity()
export class TripDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayNumber: number; // Day 1, Day 2, etc.

  @Column('text', { array: true, default: [] })
  morning: string[];

  @Column('text', { array: true, default: [] })
  afternoon: string[];

  @Column('text', { array: true, default: [] })
  evening: string[];

  @ManyToOne(() => Trip, (trip) => trip.days, { onDelete: 'CASCADE' })
  trip: Trip;
}
