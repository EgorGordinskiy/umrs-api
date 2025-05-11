import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SurveySchemaDto } from '../survey-schema/dto/survey-schema.dto';

/**
 * DTO для создания новой анкеты.
 */
export class CreateSurveyDto {
  @ApiProperty({
    description: 'Название анкеты',
    type: String,
    example: 'Анкета затрат времени перемещения на работу в N городе',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Описание анкеты',
    type: String,
    example: 'Анкета создана для опроса времени перемещения на работу',
  })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Флаг активности анкеты',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  readonly isActive?: boolean = true;

  @ApiProperty({
    description: 'ID схемы анкеты',
    type: String,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsOptional()
  readonly schemaId?: string;

  @ApiProperty({
    description: 'Схема анкеты',
    type: SurveySchemaDto,
  })
  readonly schema?: SurveySchemaDto;
}
