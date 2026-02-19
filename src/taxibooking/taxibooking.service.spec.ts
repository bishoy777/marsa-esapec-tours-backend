import { Test, TestingModule } from '@nestjs/testing';
import { TaxibookingService } from './taxibooking.service';

describe('TaxibookingService', () => {
  let service: TaxibookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxibookingService],
    }).compile();

    service = module.get<TaxibookingService>(TaxibookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
