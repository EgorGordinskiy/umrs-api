import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для обновления существующего типа GIS-поля.
 */
export class UpdateGisFieldTypeDto {
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
