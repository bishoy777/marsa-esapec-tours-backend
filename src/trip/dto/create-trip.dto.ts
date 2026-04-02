import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
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
  @IsString()
  name: string;

  @IsDateString()
  time: Date;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  tripTypeId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramDto)
  program?: ProgramDto;
}
