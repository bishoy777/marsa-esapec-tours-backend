import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';
@Entity()
export class TripType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @OneToMany(() => Trip, (trip) => trip.tripType)
  trips: Trip[];
}
