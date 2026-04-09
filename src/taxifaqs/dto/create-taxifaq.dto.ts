import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTaxifaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  answer: string;
}
