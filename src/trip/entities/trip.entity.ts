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
import { TripDay } from '@/trip/entities/trip-day.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  overview: string;

  // When the trip happens
  @Column({ type: 'timestamp' })
  date: Date;

  // Included items
  @Column('text', { array: true, default: [] })
  included: string[];

  // Excluded items
  @Column('text', { array: true, default: [] })
  excluded: string[];
  @Column('text', { array: true, default: [] })
  places: string[];

  // Price with proper precision
  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  // Multi-day program
  @OneToMany(() => TripDay, (day) => day.trip, {
    cascade: true,
    eager: true,
  })
  days: TripDay[];

  // Trip type (single / multi-day)
  @ManyToOne(() => TripType, (tripType) => tripType.trips, {
    eager: true,
    nullable: true,
  })
  tripType: TripType;

  // Images
  @OneToMany(() => TripImage, (image) => image.trip, {
    cascade: true,
    eager: true,
  })
  images: TripImage[];

  // Reservations
  @OneToMany(() => Reservation, (reservation) => reservation.trip)
  reservations: Reservation[];

  // Reviews
  @OneToMany(() => TripReview, (review) => review.trip, {
    cascade: true,
    eager: true,
  })
  reviews: TripReview[];
}
