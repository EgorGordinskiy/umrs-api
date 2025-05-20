import { TIME_FIELD_TYPE_VALUE, TimeField, TimeFieldType } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';

export class TimeFieldDto extends BaseFieldDto implements TimeField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [TIME_FIELD_TYPE_VALUE],
    default: TIME_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: TimeFieldType;

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
}
