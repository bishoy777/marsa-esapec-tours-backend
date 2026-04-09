import { Test, TestingModule } from '@nestjs/testing';
import { SimcardreviewsController } from './simcardreviews.controller';
import { SimcardreviewsService } from './simcardreviews.service';

describe('SimcardreviewsController', () => {
  let controller: SimcardreviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimcardreviewsController],
      providers: [SimcardreviewsService],
    }).compile();

    controller = module.get<SimcardreviewsController>(SimcardreviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
