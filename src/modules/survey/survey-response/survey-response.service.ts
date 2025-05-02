import { BaseServiceImpl } from '../../../common/abstract';
import { SurveyResponse } from './survey-response.entity';
import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findBySurveyId(surveyId: string): Promise<SurveyResponse[]> {
    return this.repository.find({
      relations: { survey: true },
      where: { survey: { id: surveyId } },
    });
  }
}
