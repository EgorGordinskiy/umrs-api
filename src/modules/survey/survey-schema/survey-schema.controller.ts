import { Controller } from '@nestjs/common';
import { SurveySchemaService } from './survey-schema.service';
import { SurveySchema } from './survey-schema.entity';
import { CreateSurveySchemaDto } from './dto/create-survey-schema.dto';
import { UpdateSurveySchemaDto } from './dto/update-survey-schema.dto';
import { BaseCrudController } from '../../../common/abstract/controller';

@Controller('survey-schema')
export class SurveySchemaController extends BaseCrudController<
  SurveySchema,
  CreateSurveySchemaDto,
  UpdateSurveySchemaDto
> {
  constructor(protected readonly service: SurveySchemaService) {
    super(service);
  }
}
