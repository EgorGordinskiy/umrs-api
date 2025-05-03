import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseServiceImpl } from '../../common/abstract';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './survey.entity';
import { DeleteResult, type FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from './survey-response/survey-response.entity';
import { SurveyResponseService } from './survey-response/survey-response.service';
import { SurveySchema } from './survey-schema/survey-schema.entity';

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
  ): Promise<SurveyResponse[]> {
    return await this.surveyResponseService.findAllBySurveyId(surveyId);
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

  public async delete(id: string): Promise<DeleteResult> {
    // todo создать триггер на удаление анкеты или очистке её версий, чтобы не оставлять "висящих в воздухе" схем или их версий без привязанных анкет
    return await this.repository.delete(id);
  }
}
