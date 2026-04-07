import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
  @IsArray()
  @IsString({ each: true })
  included: string[];

  @IsArray()
  @IsString({ each: true })
  excluded: string[];
  @IsArray()
  @IsString({ each: true })
  highlights: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  tripIds: number[];
}
