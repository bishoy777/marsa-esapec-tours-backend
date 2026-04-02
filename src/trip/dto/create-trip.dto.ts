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
  @Type(() => Number) // 🔥 IMPORTANT
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number) // 🔥 IMPORTANT
  tripTypeId?: number;
  @IsArray()
  @IsString({ each: true })
  included: string[];

  @IsArray()
  @IsString({ each: true })
  excluded: string[];
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramDto)
  program?: ProgramDto;
}
