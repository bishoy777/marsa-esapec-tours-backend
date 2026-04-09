import { IsString, IsNotEmpty } from 'class-validator';
export class CreateSimfaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  answer: string;
}
