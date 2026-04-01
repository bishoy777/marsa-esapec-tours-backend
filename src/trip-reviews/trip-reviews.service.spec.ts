import { Test, TestingModule } from '@nestjs/testing';
import { TripReviewsService } from './trip-reviews.service';

describe('TripReviewsService', () => {
  let service: TripReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripReviewsService],
    }).compile();

    service = module.get<TripReviewsService>(TripReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
