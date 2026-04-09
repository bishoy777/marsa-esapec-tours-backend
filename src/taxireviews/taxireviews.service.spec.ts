import { Test, TestingModule } from '@nestjs/testing';
import { TaxireviewsService } from './taxireviews.service';

describe('TaxireviewsService', () => {
  let service: TaxireviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxireviewsService],
    }).compile();

    service = module.get<TaxireviewsService>(TaxireviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
