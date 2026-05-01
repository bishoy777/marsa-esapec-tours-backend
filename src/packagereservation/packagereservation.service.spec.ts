import { Test, TestingModule } from '@nestjs/testing';
import { PackagereservationService } from './packagereservation.service';

describe('PackagereservationService', () => {
  let service: PackagereservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagereservationService],
    }).compile();

    service = module.get<PackagereservationService>(PackagereservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
