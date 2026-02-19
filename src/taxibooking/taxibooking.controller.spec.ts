import { Test, TestingModule } from '@nestjs/testing';
import { TaxibookingController } from './taxibooking.controller';
import { TaxibookingService } from './taxibooking.service';

describe('TaxibookingController', () => {
  let controller: TaxibookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxibookingController],
      providers: [TaxibookingService],
    }).compile();

    controller = module.get<TaxibookingController>(TaxibookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
