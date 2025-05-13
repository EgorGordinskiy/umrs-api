import { DATE_FIELD_TYPE_VALUE, DateField, DateFieldType } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';

export class DateFieldDto extends BaseFieldDto implements DateField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [DATE_FIELD_TYPE_VALUE],
    default: DATE_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: DateFieldType;

  @ApiProperty({
    description: 'Минимальная дата',
    type: Date,
    example: '2023-05-15T10:00:00.000Z',
  })
  @IsDate()
  min?: Date;

  @ApiProperty({
    description: 'Максимальная дата',
    type: Date,
    example: '2023-05-15T11:30:00.000Z',
  })
  @IsDate()
  max?: Date;

  @ApiProperty({
    description: 'Диапазон дат',
    type: Boolean,
    example: false,
  })
  isRange?: boolean;

  @ApiProperty({
    description: 'Включать время',
    type: Boolean,
    example: false,
  })
  includeTime?: boolean;
}
