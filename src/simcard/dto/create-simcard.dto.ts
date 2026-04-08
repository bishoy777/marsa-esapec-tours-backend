import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSimcardDto {
  @IsNumber()
  price: number;

  @IsString()
  capacity: string;

  @IsOptional()
  @IsString()
  duration?: string;
}
