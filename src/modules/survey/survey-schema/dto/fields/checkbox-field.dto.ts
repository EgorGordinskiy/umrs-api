import {
  CHECKBOX_FIELD_TYPE_VALUE,
  CheckboxField,
  CheckboxFieldType,
} from '../../fields';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';
import { OptionDto } from './option.dto';

export class CheckboxFieldDto extends BaseFieldDto implements CheckboxField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [CHECKBOX_FIELD_TYPE_VALUE],
    default: CHECKBOX_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: CheckboxFieldType;

  @ApiProperty({
    description: 'Варианты для выбора',
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(OptionDto) },
  })
  options?: OptionDto[];
}
