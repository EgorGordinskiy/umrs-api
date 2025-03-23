import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { GeometryType } from '../gis-layer.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания нового GIS-слоя.
 */
export class CreateGisLayerDto {
  /**
   * Название слоя.
   * @example 'Слой дорог'
   */
  @ApiProperty({
    example: 'Слой дорог',
    description: 'Название GIS-слоя',
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  readonly name: string;

  /**
   * Тип геометрии слоя.
   * @example 'LineString'
   */
  @ApiProperty({
    example: 'LineString',
    description: 'Тип геометрии слоя',
    enum: GeometryType,
  })
  @IsEnum(GeometryType, { message: 'Некорректный тип геометрии' })
  @IsNotEmpty({ message: 'Тип геометрии обязателен' })
  readonly geometryType: GeometryType;
}
