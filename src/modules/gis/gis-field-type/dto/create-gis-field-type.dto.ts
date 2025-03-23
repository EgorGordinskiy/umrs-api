import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FieldType } from '../field-type.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания нового типа GIS-поля.
 */
export class CreateGisFieldTypeDto {
  /**
   * Тип поля.
   * @example 'string'
   */
  @ApiProperty({
    description: 'Тип поля',
    enum: FieldType, // Указываем возможные значения перечисления
    example: FieldType.STRING,
  })
  @IsEnum(FieldType, { message: 'Некорректный тип поля' })
  @IsNotEmpty({ message: 'Тип поля обязателен' })
  readonly type: FieldType;

  /**
   * Описание типа поля.
   * @example 'Текстовое поле'
   */
  @ApiProperty({
    description: 'Описание типа поля',
    example: 'Текстовое поле',
  })
  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание обязательно' })
  readonly description: string;
}
