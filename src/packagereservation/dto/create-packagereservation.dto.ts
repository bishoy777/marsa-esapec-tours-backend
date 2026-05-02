// dto/create-reservation.dto.ts
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreatepackagereservationDto {
  @IsArray()
  @IsNumber({}, { each: true })
  tripIds: number[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  phone: string;

  @IsNumber()
  peopleCount: number;
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  hotel?: string;

  @IsOptional()
  @IsNumber()
  roomNumber?: number;

  @IsOptional()
  @IsString()
  specialRequest?: string;
  @IsOptional()
  @IsString()
  date: string;
}
