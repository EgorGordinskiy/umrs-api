import { Test, TestingModule } from '@nestjs/testing';
import { GisLayerService } from './gis-layer.service';

describe('GisLayerService', () => {
  let service: GisLayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GisLayerService],
    }).compile();

    service = module.get<GisLayerService>(GisLayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
