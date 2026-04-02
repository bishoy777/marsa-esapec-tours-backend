import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { ReviewStatus } from '../enums/review-status.enum';

export class UpdateTripReviewDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsEnum(ReviewStatus)
  status?: ReviewStatus;

  @IsOptional()
  @IsInt()
  tripId?: number;
}
