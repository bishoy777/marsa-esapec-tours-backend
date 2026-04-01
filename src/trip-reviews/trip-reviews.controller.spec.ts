import { Test, TestingModule } from '@nestjs/testing';
import { TripReviewsController } from './trip-reviews.controller';
import { TripReviewsService } from './trip-reviews.service';

describe('TripReviewsController', () => {
  let controller: TripReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripReviewsController],
      providers: [TripReviewsService],
    }).compile();

    controller = module.get<TripReviewsController>(TripReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
