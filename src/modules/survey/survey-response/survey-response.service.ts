import { BaseServiceImpl } from '../../../common/abstract';
import { SurveyResponse } from './survey-response.entity';
import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getOrder, getWhere } from '../../../database/extensions';
import { Filtering } from '../../../common/features/filtering';
import { Sorting } from '../../../common/features/sorting';

@Injectable()
export class SurveyResponseService extends BaseServiceImpl<
  SurveyResponse,
  CreateSurveyResponseDto,
  UpdateSurveyResponseDto
> {
  constructor(
    @InjectRepository(SurveyResponse)
    repository: Repository<SurveyResponse>,
  ) {
    super(repository);
  }

  findAllBySurveyId(
    surveyId: string,
    filtering?: Filtering,
    sorting?: Sorting,
  ): Promise<SurveyResponse[]> {
    // todo offset paginated версию добавить
    const where = filtering ? getWhere(filtering) : {};
    where.survey = { id: surveyId };
    const order = sorting ? getOrder(sorting) : undefined;
    return this.repository.find({
      where,
      order,
    });
  }
}
