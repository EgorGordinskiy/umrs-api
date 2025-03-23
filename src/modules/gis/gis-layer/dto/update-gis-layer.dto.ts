import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { GeometryType } from '../gis-layer.entity';

/**
 * DTO для создания нового GIS-слоя.
 */
export class UpdateGisLayerDto {
  /**
   * Название слоя.
   * @example 'Слой дорог'
   */
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string;

  /**
   * Тип геометрии слоя.
   * @example 'LineString'
   */
  @IsEnum(GeometryType, { message: 'Некорректный тип геометрии' })
  @IsNotEmpty({ message: 'Тип геометрии обязателен' })
  geometryType: GeometryType;
}
