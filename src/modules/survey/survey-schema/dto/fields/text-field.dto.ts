import { TEXT_FIELD_TYPE_VALUE, TextField, TextFieldType } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { BaseFieldDto } from './base-field.dto';

export class TextFieldDto extends BaseFieldDto implements TextField {
  @ApiProperty({
    description: 'Тип поля',
    type: String,
    enum: [TEXT_FIELD_TYPE_VALUE],
    default: TEXT_FIELD_TYPE_VALUE,
  })
  @IsString()
  readonly type: TextFieldType;

  @ApiProperty({
    description: 'Минимальная длина',
    type: Number,
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  minLength?: number;

  @ApiProperty({
    description: 'Максимальная длина',
    type: Number,
    example: 10,
  })
  maxLength?: number;

  @ApiProperty({
    description: 'Многострочный текст или нет',
    type: Boolean,
    example: false,
  })
  multiline?: boolean;
}
