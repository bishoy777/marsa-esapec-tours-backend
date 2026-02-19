import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Taxi } from '@/taxi/entities/taxi.entity';
@Entity()
export class Taxibooking {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  peopleCount: number;
  @ManyToOne(() => Taxi, (taxi) => taxi.bookings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  taxi: Taxi;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ default: false })
  askForSim: boolean;
}
