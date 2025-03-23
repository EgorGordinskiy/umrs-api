import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO для обновления существующего GIS-поля.
 */
export class UpdateGisFieldDto {
  /**
   * Название поля.
   * @example 'Площадь'
   */
  @ApiPropertyOptional({
    description: 'Название поля',
    example: 'Площадь',
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsOptional()
  readonly name?: string;

  /**
   * ID типа поля.
   * @example 2
   */
  @ApiPropertyOptional({
    description: 'ID типа поля',
    example: 2,
  })
  @IsInt({ message: 'ID типа поля должно быть числом' })
  @IsOptional()
  readonly typeId?: number;
}
