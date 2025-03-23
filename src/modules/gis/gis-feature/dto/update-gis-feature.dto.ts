import { IsObject, IsOptional } from 'class-validator';
import { Geometry } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO для обновления существующего GIS-объекта.
 */
export class UpdateGisFeatureDto {
  /**
   * Геометрия объекта.
   */
  @ApiPropertyOptional({
    description: 'Геометрия объекта',
    type: 'object',
    properties: {
      type: { type: 'string', example: 'Point' },
      coordinates: {
        type: 'array',
        items: { type: 'number' },
        example: [100.0, 0.0],
      },
    },
    additionalProperties: false,
    example: { type: 'Point', coordinates: [100.0, 0.0] },
  })
  @IsObject({ message: 'Геометрия должна быть объектом' })
  @IsOptional()
  readonly geometry?: Geometry;

  /**
   * Свойства объекта.
   */
  @ApiPropertyOptional({
    description: 'Свойства объекта (ключ-значение)',
    type: 'object',
    additionalProperties: {
      oneOf: [
        { type: 'string' },
        { type: 'number' },
        { type: 'boolean' },
        { type: 'string', format: 'date-time' }, // Для типа Date
      ],
    },
    example: { name: 'Объект 1', area: 100, isActive: true }, // Пример для свойств
  })
  @IsObject({ message: 'Свойства должны быть объектом' })
  @IsOptional()
  readonly properties?: Record<string, string | number | boolean | Date>;
}
