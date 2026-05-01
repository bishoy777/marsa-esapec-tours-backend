// create-sim-reservation.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateSimreservationDto {
  @IsString()
  @IsNotEmpty()
  simPackage: string;

  @IsNumber()
  cardsCount: number;

  @IsString()
  @IsNotEmpty()
  deliveryLocation: string;

  @IsDateString()
  date: string;

  @IsNumber()
  roomNumber: number;
  @IsNumber()
  price: number;

  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  specialRequest?: string;
}
