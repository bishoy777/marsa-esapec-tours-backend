// dto/create-review.dto.ts
import { IsInt, IsEnum, IsString, Max, Min, IsOptional } from 'class-validator';
import { ReviewStatus } from '@/trip-reviews/enums/review-status.enum';
export class CreateReviewDto {
  @IsString()
  userName: string;

  @IsOptional()
  @IsEnum(ReviewStatus)
  status?: ReviewStatus;
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
