import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Taxifaq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
