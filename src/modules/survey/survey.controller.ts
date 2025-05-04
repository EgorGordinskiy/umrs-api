import { Controller, Get, Param, Query } from '@nestjs/common';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';
import { BaseCrudController } from '../../common/abstract/controller';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SurveyResponse } from './survey-response/survey-response.entity';
import { SurveySchema } from './survey-schema/survey-schema.entity';
import { Filtering, FilteringParams } from '../../common/features/filtering';
import { Sorting, SortingParams } from '../../common/features/sorting';

@ApiTags('Анкеты')
@Controller('survey')
export class SurveyController extends BaseCrudController<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(protected readonly service: SurveyService) {
    super(service);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить анкету по ID.',
    description: 'Получить анкету по ID и связанным с ней данным.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Анкета успешно получена.' })
  @ApiNotFoundResponse({ description: 'Анкета не найдена.' })
  public async findOne(
    @Param('id') id: string,
    @Query('withSchema') withSchema: boolean = false,
    @Query('withResponses') withResponses: boolean = false,
  ): Promise<Survey> {
    return await this.service.findOne(id, withSchema, withResponses);
  }

  @Get(':id/responses')
  @ApiOperation({
    summary: 'Получить ответы анкеты по ID анкеты.',
  })
  @ApiParam({ name: 'surveyId', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Ответы анкеты успешно получены.' })
  @ApiNotFoundResponse({ description: 'Ответы анкеты не найдены.' })
  public async findResponsesBySurveyId(
    @Param('surveyId') surveyId: string,
    @FilteringParams() filtering?: Filtering,
    @SortingParams() sorting?: Sorting,
    // @FilteringParams({ key: 'responsesDataFilter' })
    // responsesDataFilter?: Filtering,
    // @SortingParams({ key: 'responsesDataSorting' })
    // responsesDataSorting?: Sorting,
  ): Promise<SurveyResponse[]> {
    return await this.service.getResponsesBySurveyId(
      surveyId,
      filtering,
      sorting,
    );
  }

  @Get(':id/schema')
  @ApiOperation({
    summary: 'Получить схему анкеты по ID анкеты.',
  })
  @ApiParam({ name: 'surveyId', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Схема анкеты успешно получена.' })
  @ApiNotFoundResponse({ description: 'Схема анкеты не найдена.' })
  public async findSchemaBySurveyId(
    @Param('surveyId') surveyId: string,
  ): Promise<SurveySchema> {
    return await this.service.getSchemaBySurveyId(surveyId);
  }
}
