import { Injectable } from '@nestjs/common';
import { SurveySchema } from './survey-schema.entity';
import { BaseServiceImpl } from '../../../common/abstract';
import { UpdateSurveySchemaDto } from './dto/update-survey-schema.dto';
import { CreateSurveySchemaDto } from './dto/create-survey-schema.dto';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {
    super(repository);
  }

  create(dto: CreateSurveySchemaDto): Promise<SurveySchema> {
    return this.repository.save(this.make(dto));
  }

  public async getBySurveyId(surveyId: string): Promise<SurveySchema | null> {
    return await this.repository.findOne({
      relations: { surveys: true },
      where: { surveys: { id: surveyId } },
    });
  }

  public async getByAnswerId(answerId: string): Promise<SurveySchema | null> {
    return await this.repository.findOne({
      relations: { surveys: true },
      where: { surveys: { responses: { id: answerId } } },
    });
  }

  update(id: number, dto: UpdateSurveySchemaDto): Promise<SurveySchema> {
    return this.repository.save(this.make(dto));
  }

  private make(
    dto: CreateSurveySchemaDto | UpdateSurveySchemaDto,
  ): SurveySchema {
    return this.repository.create({
      ...dto,
    });
  }

  public async delete(id: number): Promise<boolean> {
    const schema = await this.findOne(id);
    if (schema.surveys.length > 0) {
      throw new Error('Нельзя удалить схему, которая используется в анкетах');
    } else {
      await this.repository.delete(id);
    }
    return true;
  }
}
