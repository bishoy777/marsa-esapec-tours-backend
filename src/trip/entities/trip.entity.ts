import {
  Column,
  OneToMany,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TripType } from '@/trip-type/entities/trip-type.entity';
import { TripImage } from '@/trip/entities/trip-image.entity';
import { Reservation } from '@/reservations/entities/reservation.entity';
import { TripReview } from '@/trip-reviews/entities/trip-review.entity';
@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  time: Date;

  @Column('decimal')
  price: number;

  @Column('text')
  program: string;

  @ManyToOne(() => TripType, (tripType) => tripType.trips, {
    eager: true,
    nullable: true, // ✅ auto load type
  })
  tripType: TripType;
  @OneToMany(() => TripImage, (image) => image.trip, { eager: true })
  images: TripImage[];
  @OneToMany(() => Reservation, (reservation) => reservation.trip)
  reservations: Reservation[];
  @OneToMany(() => TripReview, (review) => review.trip, {
    eager: true,
    nullable: true, // optional
  })
  reviews: TripReview[];
}
