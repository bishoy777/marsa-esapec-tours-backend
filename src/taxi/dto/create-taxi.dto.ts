import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
export class CreateTaxiDto {
  @IsString()
  @IsNotEmpty()
  from: string;
  @IsString()
  @IsNotEmpty()
  to: string;
  @IsString()
  specialRequest: string;
  @IsNumber()
  @IsNotEmpty()
  HighSprice: number;
  @IsNumber()
  @IsNotEmpty()
  sedanPrice: number;
  @IsBoolean()
  @IsNotEmpty()
  isHotel: boolean;
}
