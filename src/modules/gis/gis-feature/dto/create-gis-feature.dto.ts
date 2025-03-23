import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Geometry } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * DTO для создания нового GIS-объекта.
 */
export class CreateGisFeatureDto {
  /**
   * Геометрия.
   */
  @ApiProperty({
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
  @IsNotEmpty({ message: 'Геометрия обязательна' })
  @IsObject({ message: 'Геометрия должна быть объектом' })
  readonly geometry: Geometry;

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
        { type: 'string', format: 'date-time' },
      ],
    },
    example: { name: 'Объект 1', area: 100, isActive: true },
  })
  @IsObject({ message: 'Свойства должны быть объектом' })
  @IsOptional()
  readonly properties?: Record<string, string | number | boolean | Date>;

  /**
   * ID слоя, к которому принадлежит объект.
   */
  @ApiProperty({
    description: 'ID слоя, к которому принадлежит объект',
    example: 1,
  })
  @IsInt({ message: 'ID слоя должно быть числом' })
  @IsNotEmpty({ message: 'ID слоя обязательно' })
  readonly layerId: number;
}

export class CreateGisFeaturesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGisFeatureDto)
  readonly features: CreateGisFeatureDto[];
}
