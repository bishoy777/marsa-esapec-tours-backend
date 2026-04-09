import { Test, TestingModule } from '@nestjs/testing';
import { SimfaqsController } from './simfaqs.controller';
import { SimfaqsService } from './simfaqs.service';

describe('SimfaqsController', () => {
  let controller: SimfaqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimfaqsController],
      providers: [SimfaqsService],
    }).compile();

    controller = module.get<SimfaqsController>(SimfaqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
