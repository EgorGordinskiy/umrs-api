import { Test, TestingModule } from '@nestjs/testing';
import { GisFieldService } from './gis-field.service';

describe('GisFieldService', () => {
  let service: GisFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GisFieldService],
    }).compile();

    service = module.get<GisFieldService>(GisFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
