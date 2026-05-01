import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
export class CreateTaxibookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  date: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  carType: string;
  @IsString()
  @IsNotEmpty()
  totalPrice: string;

  @IsNumber()
  @IsNotEmpty()
  peopleCount: number;
  @IsNumber()
  @IsNotEmpty()
  flightroomNumber: number;

  @IsNumber()
  @IsOptional()
  simCards: number;

  @IsString()
  @IsOptional()
  simCapacity?: string;
  @IsString()
  @IsOptional()
  specialRequest?: string;

  @IsNumber()
  @IsNotEmpty()
  taxiId: number; // to link the taxi
}
