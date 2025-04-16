import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { FilterConditionDTO } from './request-data.dto';

export const FilterConditionDtoSwaggerProperty = () =>
  ApiProperty({
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
  });
