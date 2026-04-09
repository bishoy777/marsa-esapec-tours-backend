import { Test, TestingModule } from '@nestjs/testing';
import { TaxifaqsService } from './taxifaqs.service';

describe('TaxifaqsService', () => {
  let service: TaxifaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxifaqsService],
    }).compile();

    service = module.get<TaxifaqsService>(TaxifaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
