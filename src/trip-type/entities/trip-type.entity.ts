import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TripType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
}
