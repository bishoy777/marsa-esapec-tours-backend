import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Taxibooking } from '@/taxibooking/entities/taxibooking.entity';

@Entity()
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  isHotel: boolean;

  @Column('decimal')
  sedanPrice: number;
  @Column('decimal')
  HighSprice: number;
  @OneToMany(() => Taxibooking, (booking) => booking.taxi)
  bookings: Taxibooking[];
}
