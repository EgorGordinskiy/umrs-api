import { Test, TestingModule } from '@nestjs/testing';
import { GisLayerController } from './gis-layer.controller';

describe('GisLayerController', () => {
  let controller: GisLayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GisLayerController],
    }).compile();

    controller = module.get<GisLayerController>(GisLayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
