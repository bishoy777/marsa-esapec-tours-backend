import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProgramDto {
  @IsArray()
  @IsString({ each: true })
  morning: string[];

  @IsArray()
  @IsString({ each: true })
  afternoon: string[];

  @IsArray()
  @IsString({ each: true })
  evening: string[];
}

export class CreateTripDto {
  name: string;
  time: Date;
  price: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramDto)
  program: ProgramDto;

  tripTypeId?: number;
}
