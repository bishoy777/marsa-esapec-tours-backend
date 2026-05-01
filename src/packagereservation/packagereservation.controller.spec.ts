import { Test, TestingModule } from '@nestjs/testing';
import { PackagereservationController } from './packagereservation.controller';
import { PackagereservationService } from './packagereservation.service';

describe('PackagereservationController', () => {
  let controller: PackagereservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagereservationController],
      providers: [PackagereservationService],
    }).compile();

    controller = module.get<PackagereservationController>(PackagereservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
