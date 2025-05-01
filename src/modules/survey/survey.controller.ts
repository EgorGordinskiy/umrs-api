import { Controller } from '@nestjs/common';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';
import { BaseCrudController } from '../../common/abstract/controller';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller('survey')
export class SurveyController extends BaseCrudController<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(protected readonly service: SurveyService) {
    super(service);
  }
}
