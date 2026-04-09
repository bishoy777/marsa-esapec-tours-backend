import { Test, TestingModule } from '@nestjs/testing';
import { TaxireviewsController } from './taxireviews.controller';
import { TaxireviewsService } from './taxireviews.service';

describe('TaxireviewsController', () => {
  let controller: TaxireviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxireviewsController],
      providers: [TaxireviewsService],
    }).compile();

    controller = module.get<TaxireviewsController>(TaxireviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
