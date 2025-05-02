import { Injectable, NotFoundException } from '@nestjs/common';
import { SurveySchema } from './survey-schema.entity';
import { BaseServiceImpl } from '../../../common/abstract';
import { UpdateSurveySchemaDto } from './dto/update-survey-schema.dto';
import { CreateSurveySchemaDto } from './dto/create-survey-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveySchemaService extends BaseServiceImpl<
  SurveySchema,
  CreateSurveySchemaDto,
  UpdateSurveySchemaDto
> {
  constructor(
    @InjectRepository(SurveySchema)
    repository: Repository<SurveySchema>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {
    super(repository);
  }

  create(dto: CreateSurveySchemaDto): Promise<SurveySchema> {
    return this.repository.save(this.make(dto));
  }

  public async getBySurveyId(surveyId: string): Promise<SurveySchema> {
    const found = await this.repository.findOne({
      relations: { surveys: true },
      where: { surveys: { id: surveyId } },
    });
    if (!found) {
      throw new NotFoundException(
        `Сущность SurveySchema через Survey с ID ${surveyId} не найдена.`,
      );
    }
    return found;
  }

  public async getByResponseId(responseId: string): Promise<SurveySchema> {
    const found = await this.repository.findOne({
      relations: { surveys: { responses: true } },
      where: { surveys: { responses: { id: responseId } } },
    });
    if (!found) {
      throw new NotFoundException(
        `Сущность SurveySchema через SurveyResponse с ID ${responseId} не найдена.`,
      );
    }
    return found;
  }

  update(id: string, dto: UpdateSurveySchemaDto): Promise<SurveySchema> {
    return this.repository.save(this.make(dto));
  }

  private make(
    dto: CreateSurveySchemaDto | UpdateSurveySchemaDto,
  ): SurveySchema {
    return this.repository.create({
      ...dto,
    });
  }

  public async delete(id: string): Promise<boolean> {
    const linkedSurveysExist = await this.surveyRepository.existsBy({
      schema: { id },
    });
    if (linkedSurveysExist) {
      throw new Error(
        `Нельзя удалить схему с ID ${id}, которая используется в анкетах`,
      );
    } else {
      await this.repository.delete(id);
    }
    return true;
  }
}
