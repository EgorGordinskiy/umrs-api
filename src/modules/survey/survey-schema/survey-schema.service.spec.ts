import { Test, TestingModule } from '@nestjs/testing';
import { SurveySchemaService } from './survey-schema.service';

describe('SurveySchemaService', () => {
  let service: SurveySchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveySchemaService],
    }).compile();

    service = module.get<SurveySchemaService>(SurveySchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
