import { BaseField } from '../../fields';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BaseFieldDto implements BaseField {
  @ApiProperty({
    description: 'Уникальный идентификатор',
    type: String,
    example: '92180d89-3dde-4ee2-b857-8a71213df5c1',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: 'Ключ поля',
    type: String,
    example: 'age-field',
  })
  @IsString()
  readonly key: string;

  @ApiProperty({
    description: 'Тип поля',
    type: String,
    example: 'type',
  })
  @IsString()
  readonly type: string;

  @ApiProperty({
    description: 'Название поля',
    type: String,
    example: 'Возраст',
  })
  @IsString()
  readonly label: string;

  @ApiProperty({
    description: 'Обязательное поле',
    type: Boolean,
    example: true,
  })
  readonly required: boolean;

  @ApiProperty({
    description: 'Видимость',
    type: Boolean,
    example: false,
  })
  readonly visible?: boolean;

  @ApiProperty({
    description: 'Значение по умолчанию',
    type: Boolean,
    example: false,
  })
  readonly defaultValue?: unknown;
}
