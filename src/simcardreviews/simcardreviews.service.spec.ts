import { Test, TestingModule } from '@nestjs/testing';
import { SimcardreviewsService } from './simcardreviews.service';

describe('SimcardreviewsService', () => {
  let service: SimcardreviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimcardreviewsService],
    }).compile();

    service = module.get<SimcardreviewsService>(SimcardreviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
