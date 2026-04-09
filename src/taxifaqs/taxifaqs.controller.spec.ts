import { Test, TestingModule } from '@nestjs/testing';
import { TaxifaqsController } from './taxifaqs.controller';
import { TaxifaqsService } from './taxifaqs.service';

describe('TaxifaqsController', () => {
  let controller: TaxifaqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxifaqsController],
      providers: [TaxifaqsService],
    }).compile();

    controller = module.get<TaxifaqsController>(TaxifaqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
