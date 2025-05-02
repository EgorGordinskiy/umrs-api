import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './survey-response.entity';
import { CreateSurveyResponseDto } from './dto/create-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-response.dto';
import { BaseCrudController } from '../../../common/abstract/controller';
import { Controller } from '@nestjs/common';
import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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

  @Get('/by-survey/:surveyId')
  @ApiOperation({
    summary: 'Получить ответы анкеты по ID анкеты.',
  })
  @ApiParam({ name: 'surveyId', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Ответы анкеты успешно получены.' })
  @ApiNotFoundResponse({ description: 'Ответы анкеты не найдены.' })
  public async findBySurveyId(
    @Param('surveyId') surveyId: string,
  ): Promise<SurveyResponse[]> {
    return await this.service.findBySurveyId(surveyId);
  }
}
