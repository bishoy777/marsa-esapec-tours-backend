import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  peopleCount: number;

  @IsDateString()
  date: string;

  @IsNumber()
  tripId: number; // which trip to reserve
}
