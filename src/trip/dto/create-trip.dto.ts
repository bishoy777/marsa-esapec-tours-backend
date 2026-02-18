import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsDateString()
  @IsNotEmpty()
  time: Date;
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  program: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  tripTypeId: number;
}
