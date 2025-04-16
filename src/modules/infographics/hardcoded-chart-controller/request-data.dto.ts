import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FilterConditionDtoSwaggerProperty } from './request-data.dto.swagger';

export class FilterConditionDTO {
  @ApiProperty({ required: false })
  eq?: never;

  @ApiProperty({ required: false })
  neq?: never;

  @ApiProperty({ required: false })
  gt?: never;

  @ApiProperty({ required: false })
  gte?: never;

  @ApiProperty({ required: false })
  lt?: never;

  @ApiProperty({ required: false })
  lte?: never;

  @ApiProperty({ required: false })
  like?: string;

  @ApiProperty({ required: false })
  notLike?: string;

  @ApiProperty({ required: false, type: [String] })
  in?: never[];

  @ApiProperty({ required: false, type: [String] })
  notIn?: never[];
}

export class PaginationDTO {
  @IsNumber()
  @IsInt()
  @Min(0)
  @ApiProperty()
  limit: number;

  @IsNumber()
  @Min(0)
  @IsInt()
  @ApiProperty()
  offset: number;
}

export class DataRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  entity: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty()
  fields: string[];

  @IsObject()
  @FilterConditionDtoSwaggerProperty()
  filter: { [key: string]: FilterConditionDTO };

  @IsObject()
  @ApiProperty({ enum: ['ASC', 'DESC'] })
  sort: { [key: string]: 'ASC' | 'DESC' };

  @IsObject()
  @ApiProperty({ type: PaginationDTO })
  pagination: PaginationDTO;
}
