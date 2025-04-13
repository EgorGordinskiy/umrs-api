import { Test, TestingModule } from '@nestjs/testing';
import { SurveySchemaController } from './survey-schema.controller';

describe('SurveySchemaController', () => {
  let controller: SurveySchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveySchemaController],
    }).compile();

    controller = module.get<SurveySchemaController>(SurveySchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
