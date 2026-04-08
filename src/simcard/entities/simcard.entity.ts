import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Simcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column()
  capacity: string; // e.g. "10GB", "25GB"

  @Column({ nullable: true })
  duration: string; // e.g. "7 days", "30 days"
}