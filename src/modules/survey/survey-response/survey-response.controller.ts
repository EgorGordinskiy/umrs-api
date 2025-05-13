import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './survey-response.entity';
import { CreateSurveyResponseDto } from './dto/create-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-response.dto';
import { BaseCrudController } from '../../../common/abstract/controller';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ответы на анкеты')
@Controller('survey-response')
export class SurveyResponseController extends BaseCrudController<
  SurveyResponse,
  CreateSurveyResponseDto,
  UpdateSurveyResponseDto
> {
  constructor(protected readonly service: SurveyResponseService) {
    super(service);
  }
}
