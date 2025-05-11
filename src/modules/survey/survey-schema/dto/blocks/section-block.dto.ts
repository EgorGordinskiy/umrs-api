import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  SECTION_TYPE_VALUE,
  SectionBlock,
  SectionBlockType,
} from '../../blocks';
import { BaseBlockDto } from './base-block.dto';
import { SurveyField } from '../../fields';
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

export class SectionBlockDto extends BaseBlockDto implements SectionBlock {
  @ApiProperty({
    type: String,
    enum: [SECTION_TYPE_VALUE],
    default: SECTION_TYPE_VALUE,
  })
  @IsString()
  readonly type: SectionBlockType;

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
  readonly fields: SurveyField[];
}
