import { Injectable } from '@nestjs/common';
import { BaseServiceImpl } from '../../common/abstract';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './survey.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SurveyService extends BaseServiceImpl<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(
    @InjectRepository(Survey)
    repository: Repository<Survey>,
  ) {
    super(repository);
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
    // todo нужно ли создавать триггер на удаление анкеты или очистке её версий, чтобы не оставлять "висящих в воздухе" схем или их версий без привязанных анкет
    return await this.repository.delete(id);
  }
}
