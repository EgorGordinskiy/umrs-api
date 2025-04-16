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
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

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
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(FilterConditionDTO),
    },
    example: {
      key1: {
        like: 'example',
        eq: 'specificValue',
      },
      key2: {
        neq: 'anotherValue',
      },
    },
  })
  filter: { [key: string]: FilterConditionDTO };

  @IsObject()
  @ApiProperty()
  sort: { [key: string]: 'ASC' | 'DESC' };

  @IsObject()
  @ApiProperty({ type: PaginationDTO })
  pagination: PaginationDTO;
}
