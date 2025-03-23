import { Test, TestingModule } from '@nestjs/testing';
import { GisFieldTypeController } from './gis-field-type.controller';

describe('GisFieldTypeController', () => {
  let controller: GisFieldTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GisFieldTypeController],
    }).compile();

    controller = module.get<GisFieldTypeController>(GisFieldTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
