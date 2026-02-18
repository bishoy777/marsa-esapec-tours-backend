import { Test, TestingModule } from '@nestjs/testing';
import { TripTypeService } from './trip-type.service';

describe('TripTypeService', () => {
  let service: TripTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripTypeService],
    }).compile();

    service = module.get<TripTypeService>(TripTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
