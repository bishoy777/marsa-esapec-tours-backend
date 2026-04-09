// reviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/simcardreview.entity';
import { ReviewsService } from './simcardreviews.service';
import { ReviewsController } from './simcardreviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class SimcardreviewsModule {}
