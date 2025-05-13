import {
  DYNAMIC_LIST_TYPE_VALUE,
  DynamicListBlock,
  DynamicListBlockType,
} from '../../blocks';
import { BaseBlockDto } from './base-block.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { SurveyField } from '../../fields';
import { SurveyAction } from '../../survey-schema.entity';
import { SurveyActionDto } from '../survey-schema.dto';
import {
  AddressFieldDto,
  CheckboxFieldDto,
  DateFieldDto,
  NumberFieldDto,
  RadioFieldDto,
  SelectFieldDto,
  TextFieldDto,
  TimeFieldDto,
} from '../fields';

export class DynamicListBlockItemDto {
  @ApiProperty({
    type: Array,
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(TextFieldDto) },
      { $ref: getSchemaPath(NumberFieldDto) },
      { $ref: getSchemaPath(SelectFieldDto) },
      { $ref: getSchemaPath(RadioFieldDto) },
      { $ref: getSchemaPath(CheckboxFieldDto) },
      { $ref: getSchemaPath(AddressFieldDto) },
      { $ref: getSchemaPath(DateFieldDto) },
      { $ref: getSchemaPath(TimeFieldDto) },
    ],
  })
  fields: SurveyField[];

  @ApiProperty({
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(SurveyActionDto) },
  })
  actions?: SurveyAction[];
}

export class DynamicListBlockDto
  extends BaseBlockDto
  implements DynamicListBlock
{
  @ApiProperty({
    type: String,
    enum: [DYNAMIC_LIST_TYPE_VALUE],
    default: DYNAMIC_LIST_TYPE_VALUE,
  })
  @IsString()
  readonly type: DynamicListBlockType;

  @ApiProperty({
    type: Number,
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  minItems?: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsNumber()
  maxItems?: number;

  @ApiProperty({
    type: DynamicListBlockItemDto,
    isArray: true,
  })
  item: DynamicListBlockItemDto;

  @ApiProperty({
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(SurveyActionDto) },
  })
  actions?: SurveyActionDto[];
}
