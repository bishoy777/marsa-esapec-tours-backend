// dto/create-taxireview.dto.ts
import { IsInt, IsEnum, IsString, IsOptional, Max, Min } from 'class-validator';
import { ReviewStatus } from '@/trip-reviews/enums/review-status.enum';
export class CreateTaxireviewDto {
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
