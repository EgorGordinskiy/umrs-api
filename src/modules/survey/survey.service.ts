import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseServiceImpl } from '../../common/abstract';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './survey.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from './survey-response/survey-response.entity';
import { SurveyResponseService } from './survey-response/survey-response.service';
import { SurveySchema } from './survey-schema/survey-schema.entity';
import { Filtering } from '../../common/features/filtering';
import { Sorting } from '../../common/features/sorting';

@Injectable()
export class SurveyService extends BaseServiceImpl<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(
    @InjectRepository(Survey)
    repository: Repository<Survey>,
    private readonly surveyResponseService: SurveyResponseService,
  ) {
    super(repository);
  }

  public async findOne(
    id: string,
    withSchema = false,
    withResponses = false,
  ): Promise<Survey> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Survey>,
      relations: {
        schema: withSchema,
        responses: withResponses,
      },
      cache: this.cache,
    });

    if (!entity) {
      throw new NotFoundException(`Сущность Survey с ID ${id} не найдена.`);
    }

    return entity;
  }

  public async getSchemaBySurveyId(surveyId: string): Promise<SurveySchema> {
    const survey = await this.findOne(surveyId, true, false);

    if (!survey.schema) {
      throw new NotFoundException(
        `У анкеты с ID ${surveyId} не найдена связанная схема.`,
      );
    }

    return survey.schema;
  }

  public async getResponsesBySurveyId(
    surveyId: string,
    filtering?: Filtering,
    sorting?: Sorting,
    // responsesDataFilter?: Filtering,
    // responsesDataSorting?: Sorting,
  ): Promise<SurveyResponse[]> {
    // todo offset paginated версию добавить
    const surveyResponses = await this.surveyResponseService.findAllBySurveyId(
      surveyId,
      filtering,
      sorting,
    );

    // todo пока втупую берем всё и после этого тут фильтруем и сортируем
    // todo поскольку для json тут надо учитывать потенциально сильно больше данных
    // todo и n глубину ключа в response.data, то тут, пожалуй, лучше post запрос
    // todo и немного больше логики, которая начиналась в infographics модуле, но видимо станет json-processing модулем что ли
    return surveyResponses;
  }

  public create(dto: CreateSurveyDto): Promise<Survey> {
    return this.repository.save(this.make(dto));
  }

  public update(id: number, dto: UpdateSurveyDto): Promise<Survey> {
    // todo версионирование
    return this.repository.save(this.make(dto));
  }

  private make(dto: CreateSurveyDto | UpdateSurveyDto): Survey {
    return this.repository.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });
  }
}
