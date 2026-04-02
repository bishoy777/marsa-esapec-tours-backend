import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripReviewDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  rating: number;

  @IsNumber()
  @Type(() => Number)
  tripId: number;
}
