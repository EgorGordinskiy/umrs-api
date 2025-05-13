import { PartialType } from '@nestjs/swagger';
import { CreateSurveyDto } from './create-survey.dto';

/**
 * DTO для обновления анкеты.
 */
export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {}
