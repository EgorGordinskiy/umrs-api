import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для создания нового GIS-поля.
 */
export class CreateGisFieldDto {
  /**
   * Название поля.
   * @example 'Площадь'
   */
  @ApiProperty({
    description: 'Название поля',
    example: 'Площадь',
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  readonly name: string;

  /**
   * ID типа поля.
   * @example 1
   */
  @ApiProperty({
    description: 'ID типа поля',
    example: 1,
  })
  @IsInt({ message: 'ID типа поля должно быть числом' })
  @IsNotEmpty({ message: 'ID типа поля обязательно' })
  readonly typeId: number;

  /**
   * ID слоя.
   * @example 1
   */
  @ApiProperty({
    description: 'ID слоя',
    example: 1,
  })
  @IsInt({ message: 'ID слоя должно быть числом' })
  @IsNotEmpty({ message: 'ID слоя обязательно' })
  readonly layerId: number;
}
