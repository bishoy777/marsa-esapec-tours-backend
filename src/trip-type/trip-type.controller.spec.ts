import { Test, TestingModule } from '@nestjs/testing';
import { TripTypeController } from './trip-type.controller';
import { TripTypeService } from './trip-type.service';

describe('TripTypeController', () => {
  let controller: TripTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripTypeController],
      providers: [TripTypeService],
    }).compile();

    controller = module.get<TripTypeController>(TripTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
