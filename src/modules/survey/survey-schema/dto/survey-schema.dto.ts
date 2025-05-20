import { IsString } from 'class-validator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  SURVEY_ACTION_TYPE_VALUES,
  SurveyAction,
  SurveyActionType,
  SurveySchemaStructure,
} from '../survey-schema.entity';
import { DynamicListBlockDto, SectionBlockDto } from './blocks';

export class SurveyActionDto implements SurveyAction {
  @ApiProperty({
    description: 'Тип действия над анкетой',
    type: String,
    enum: Object.values(SURVEY_ACTION_TYPE_VALUES),
    default: Object.values(SURVEY_ACTION_TYPE_VALUES)[0],
  })
  @IsString()
  readonly type: SurveyActionType;

  @ApiProperty({
    description: 'Читаемая метка для действия над анкетой',
    type: String,
    example: 'Отправить данные заполненной анкеты',
  })
  @IsString()
  readonly label: string;

  @ApiProperty({
    description: 'Флаг отображения иконки у действия над анкетой',
    type: Boolean,
    example: true,
  })
  readonly icon: boolean;
}

export class SurveySchemaStructureDto implements SurveySchemaStructure {
  @ApiProperty({
    description: 'Блоки анкеты',
    type: Array,
    isArray: true,
    items: {
      oneOf: [
        { $ref: getSchemaPath(SectionBlockDto) },
        { $ref: getSchemaPath(DynamicListBlockDto) },
      ],
    },
  })
  readonly blocks: Array<SectionBlockDto | DynamicListBlockDto>;

  @ApiProperty({
    description: 'Действия над анкетой',
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(SurveyActionDto) },
  })
  readonly actions?: Array<SurveyActionDto>;
}

export class SurveySchemaDto {
  @ApiProperty({
    description: 'Название анкеты',
    type: String,
    example: 'Опрос времени перемещения на работу',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Структура анкеты',
    type: SurveySchemaStructureDto,
  })
  readonly structure: SurveySchemaStructureDto;
}
