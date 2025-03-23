import { Test, TestingModule } from '@nestjs/testing';
import { GisFieldController } from './gis-field.controller';

describe('GisFieldController', () => {
  let controller: GisFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GisFieldController],
    }).compile();

    controller = module.get<GisFieldController>(GisFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
