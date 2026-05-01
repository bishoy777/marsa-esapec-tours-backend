// sim-reservation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sim_reservations')
export class SimReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  simPackage: string;

  @Column()
  cardsCount: number;

  @Column()
  deliveryLocation: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  roomNumber: number;
  @Column()
  price: number;
  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  specialRequest?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
