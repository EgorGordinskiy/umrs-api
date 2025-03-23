import { Test, TestingModule } from '@nestjs/testing';
import { GisFeatureController } from './gis-feature.controller';

describe('GisFeatureController', () => {
  let controller: GisFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GisFeatureController],
    }).compile();

    controller = module.get<GisFeatureController>(GisFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
