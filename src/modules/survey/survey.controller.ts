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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SurveyResponse } from './survey-response/survey-response.entity';
import { SurveySchema } from './survey-schema/survey-schema.entity';
import {
  Sorting,
  SortingParams,
} from '../../common/decorators/params/SortingParams';

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

  @Get('sorted-test')
  @ApiOperation({ summary: 'Получить все анкеты' })
  @ApiQuery({
    name: 'sorting',
    required: false,
    type: 'string',
    description: 'Способ сортировки',
    examples: {
      default: {
        value: 'title:desc',
      },
    },
  })
  @ApiOkResponse({ description: 'Анкеты успешно получены.' })
  public async findAllSorted(
    @SortingParams({ key: 'sorting' }) sorting?: Sorting,
  ): Promise<Survey[]> {
    // todo вытащить это в базовый контроллер
    console.log('controller: ', sorting);
    return await this.service.findAllSorted(sorting);
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
  ): Promise<SurveyResponse[]> {
    // todo pagination
    return await this.service.getResponsesBySurveyId(surveyId);
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
