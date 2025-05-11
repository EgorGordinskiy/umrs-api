import {
  SELECT_FIELD_TYPE_VALUE,
  SelectField,
  SelectFieldType,
} from '../../fields';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';
import { OptionDto } from './option.dto';

export class SelectFieldDto extends BaseFieldDto implements SelectField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [SELECT_FIELD_TYPE_VALUE],
    default: SELECT_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: SelectFieldType;

  @ApiProperty({
    description: 'Варианты для выбора',
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(OptionDto) },
  })
  options: OptionDto[];

  @ApiProperty({
    description: 'Множественный выбор',
    type: Boolean,
    example: false,
  })
  multiple?: boolean;
}
