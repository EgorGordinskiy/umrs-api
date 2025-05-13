import {
  NUMBER_FIELD_TYPE_VALUE,
  NUMBER_KIND,
  NumberField,
  NumberFieldType,
  NumberKindType,
} from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';

export class NumberFieldDto extends BaseFieldDto implements NumberField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [NUMBER_FIELD_TYPE_VALUE],
    default: NUMBER_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: NumberFieldType;

  @ApiProperty({
    description: 'Минимальное значение',
    type: Number,
    example: 10,
  })
  @IsNumber()
  min?: number;

  @ApiProperty({
    description: 'Максимальное значение',
    type: Number,
    example: 10,
  })
  @IsNumber()
  max?: number;

  @ApiProperty({
    description: 'Вид числа',
    type: String,
    enum: [Object.values(NUMBER_KIND)],
    default: Object.values(NUMBER_KIND)[0],
  })
  @IsString()
  numberKind: NumberKindType;

  @ApiProperty({
    description: 'Максимальная точность',
    type: Number,
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  maxPrecision?: number;
}
