import { BaseServiceImpl } from '../../../common/abstract';
import { SurveyResponse } from './survey-response.entity';
import { Injectable } from '@nestjs/common';
import { CreateSurveyResponseDto } from './dto/create-response.dto';
import { UpdateSurveyResponseDto } from './dto/update-response.dto';

@Injectable()
export class SurveyResponseService extends BaseServiceImpl<
  SurveyResponse,
  CreateSurveyResponseDto,
  UpdateSurveyResponseDto
> {}
