import { Test, TestingModule } from '@nestjs/testing';
import { SimcardController } from './simcard.controller';
import { SimcardService } from './simcard.service';

describe('SimcardController', () => {
  let controller: SimcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimcardController],
      providers: [SimcardService],
    }).compile();

    controller = module.get<SimcardController>(SimcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
