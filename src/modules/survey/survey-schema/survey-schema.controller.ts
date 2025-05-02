import { Controller, Get, Param } from '@nestjs/common';
import { SurveySchemaService } from './survey-schema.service';
import { SurveySchema } from './survey-schema.entity';
import { CreateSurveySchemaDto } from './dto/create-survey-schema.dto';
import { UpdateSurveySchemaDto } from './dto/update-survey-schema.dto';
import { BaseCrudController } from '../../../common/abstract/controller';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Схемы анкет')
@Controller('survey-schema')
export class SurveySchemaController extends BaseCrudController<
  SurveySchema,
  CreateSurveySchemaDto,
  UpdateSurveySchemaDto
> {
  constructor(protected readonly service: SurveySchemaService) {
    super(service);
  }

  @Get('/by-survey/:surveyId')
  @ApiOperation({
    summary: 'Получить схему анкеты по ID анкеты.',
  })
  @ApiParam({ name: 'surveyId', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Схема анкеты успешно получена.' })
  @ApiNotFoundResponse({ description: 'Схема анкеты не найдена.' })
  public async findBySurveyId(
    @Param('surveyId') surveyId: string,
  ): Promise<SurveySchema> {
    return await this.service.getBySurveyId(surveyId);
  }

  @Get('/by-survey-response/:surveyResponseId')
  @ApiOperation({
    summary: 'Получить схему анкеты по ID ответа связанной с ней анкеты.',
  })
  @ApiParam({
    name: 'surveyId',
    type: String,
    description: 'ID ответа связанной анкеты',
  })
  @ApiOkResponse({ description: 'Схема анкеты успешно получена.' })
  @ApiNotFoundResponse({ description: 'Схема анкеты не найдена.' })
  public async findBySurveyResponseId(
    @Param('surveyResponseId') surveyResponseId: string,
  ): Promise<SurveySchema> {
    return await this.service.getByResponseId(surveyResponseId);
  }
}
