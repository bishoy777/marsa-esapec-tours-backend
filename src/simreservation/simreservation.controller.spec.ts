import { Test, TestingModule } from '@nestjs/testing';
import { SimreservationController } from './simreservation.controller';
import { SimreservationService } from './simreservation.service';

describe('SimreservationController', () => {
  let controller: SimreservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimreservationController],
      providers: [SimreservationService],
    }).compile();

    controller = module.get<SimreservationController>(SimreservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
