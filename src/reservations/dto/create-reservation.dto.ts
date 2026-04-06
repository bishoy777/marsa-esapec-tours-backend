import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  hotel: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsOptional()
  specailRequest: string;

  @IsNumber()
  peopleCount: number;
  @IsNumber()
  @IsOptional()
  roomNumber: number;

  @IsDateString()
  date: string;

  @IsNumber()
  tripId: number; // which trip to reserve
}
