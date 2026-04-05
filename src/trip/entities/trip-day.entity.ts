import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';

@Entity()
export class TripDay {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { array: true, default: [] })
  morning: string[];

  @Column('text', { array: true, default: [] })
  afternoon: string[];

  @Column('text', { array: true, default: [] })
  evining: string[];

  @ManyToOne(() => Trip, (trip) => trip.days, { onDelete: 'CASCADE' })
  trip: Trip;
}
