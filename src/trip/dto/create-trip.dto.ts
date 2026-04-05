import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProgramDto {
  @IsNumber()
  @Type(() => Number)

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
  @IsString()
  overview: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tripTypeId?: number;

  @IsArray()
  @IsString({ each: true })
  included: string[];

  @IsArray()
  @IsString({ each: true })
  excluded: string[];
  @IsArray()
  @IsString({ each: true })
  places: string[];

  // ✅ MULTI-DAY PROGRAM (IMPORTANT CHANGE)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramDto)
  days?: ProgramDto[];
}
