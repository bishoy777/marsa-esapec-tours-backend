import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
  @Column('text', { array: true })
  included: string[];
  @Column('text', { array: true })
  excluded: string[];
  @Column('text', { array: true })
  highlights: string[];

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Trip, (trip) => trip.packages, {
    eager: true, // 👈 auto load trips
  })
  @JoinTable()
  trips: Trip[];
}
