import { Injectable } from '@nestjs/common';
import { SurveySchema } from './survey-schema.entity';
import { BaseServiceImpl } from '../../../common/abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveySchemaDto } from './dto/survey-schema.dto';

@Injectable()
export class SurveySchemaService extends BaseServiceImpl<
  SurveySchema,
  SurveySchemaDto,
  SurveySchemaDto
> {
  constructor(
    @InjectRepository(SurveySchema)
    repository: Repository<SurveySchema>,
  ) {
    super(repository);
  }
}
