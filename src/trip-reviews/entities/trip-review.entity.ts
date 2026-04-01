import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trip } from '@/trip/entities/trip.entity';
import { ReviewStatus } from '../enums/review-status.enum';

@Entity()
export class TripReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column('text')
  comment: string;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
  })
  status: ReviewStatus;

  @Column('int')
  rating: number;

  @ManyToOne(() => Trip, (trip) => trip.reviews, {
    onDelete: 'CASCADE',
  })
  trip: Trip;
}
