import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Simfaq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
