import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
