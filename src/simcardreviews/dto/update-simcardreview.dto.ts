import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-simcardreview.dto';

export class UpdateSimcardreviewDto extends PartialType(CreateReviewDto) {}
