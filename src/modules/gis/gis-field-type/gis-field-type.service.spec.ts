import { Test, TestingModule } from '@nestjs/testing';
import { GisFieldTypeService } from './gis-field-type.service';

describe('GisFieldTypeService', () => {
  let service: GisFieldTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GisFieldTypeService],
    }).compile();

    service = module.get<GisFieldTypeService>(GisFieldTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
