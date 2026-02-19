import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTaxiDto {
  @IsString()
  @IsNotEmpty()
  from: string;
  @IsString()
  @IsNotEmpty()
  to: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
