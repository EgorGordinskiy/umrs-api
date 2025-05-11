import {
  RADIO_FIELD_TYPE_VALUE,
  RadioField,
  RadioFieldType,
} from '../../fields';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';
import { OptionDto } from './option.dto';

export class RadioFieldDto extends BaseFieldDto implements RadioField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [RADIO_FIELD_TYPE_VALUE],
    default: RADIO_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: RadioFieldType;

  @ApiProperty({
    description: 'Варианты для выбора',
    type: Array,
    isArray: true,
    items: { $ref: getSchemaPath(OptionDto) },
  })
  options: OptionDto[];
}
