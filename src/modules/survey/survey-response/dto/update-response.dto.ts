import { CreateSurveyResponseDto } from './create-response.dto';
import { OmitType } from '@nestjs/swagger';

/**
 * DTO для обновления ответа на опрос.
 * - `surveyId`: Должен быть действительным UUID.
 * - `data`: Должен быть объектом, содержащим данные ответа на опрос.
 */
export class UpdateSurveyResponseDto extends OmitType(CreateSurveyResponseDto, [
  'metadata',
]) {}
