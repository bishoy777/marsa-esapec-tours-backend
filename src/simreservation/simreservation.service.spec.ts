import { Test, TestingModule } from '@nestjs/testing';
import { SimreservationService } from './simreservation.service';

describe('SimreservationService', () => {
  let service: SimreservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimreservationService],
    }).compile();

    service = module.get<SimreservationService>(SimreservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
