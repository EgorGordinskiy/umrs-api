import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsUUID } from 'class-validator';
import { ResponseMetadata } from '../survey-response.entity';

/**
 * DTO для создания ответа на опрос.
 * - `surveyId`: Должен быть действительным UUID.
 * - `data`: Должен быть объектом, содержащим данные ответа на опрос.
 * - `metadata`: Должен быть объектом, содержащим метаданные ответа на опрос.
 */
export class CreateSurveyResponseDto {
  @ApiProperty({
    description: 'UUID анкеты',
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  readonly surveyId!: string;

  @ApiProperty({
    description: 'Данные ответов на опрос в виде пар ключ-значение',
    required: true,
    example: { question1: 'Да', question2: 5 },
  })
  @IsObject()
  readonly data!: Record<string, unknown>;

  @ApiProperty({
    description: 'Метаданные ответа на опрос',
    required: false,
  })
  readonly metadata?: ResponseMetadata;
}
