import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';
export class CreateTaxibookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  peopleCount: number;

  @IsDateString()
  @IsNotEmpty()
  tripDate: string;

  @IsBoolean()
  askForSim?: boolean;

  @IsNumber()
  @IsNotEmpty()
  taxiId: number; // to link the taxi
}
