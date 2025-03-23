import { Test, TestingModule } from '@nestjs/testing';
import { GisFeatureService } from './gis-feature.service';

describe('GisFeatureService', () => {
  let service: GisFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GisFeatureService],
    }).compile();

    service = module.get<GisFeatureService>(GisFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
