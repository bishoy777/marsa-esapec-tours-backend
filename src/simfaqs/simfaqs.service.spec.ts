import { Test, TestingModule } from '@nestjs/testing';
import { SimfaqsService } from './simfaqs.service';

describe('SimfaqsService', () => {
  let service: SimfaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimfaqsService],
    }).compile();

    service = module.get<SimfaqsService>(SimfaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
