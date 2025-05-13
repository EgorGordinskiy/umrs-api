/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import CursorPaginatedResponseDto from './cursor-paginated-response.dto';

export const ApiCursorPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  example: object,
) => {
  return applyDecorators(
    ApiExtraModels(CursorPaginatedResponseDto, model),
    ApiOkResponse({
      example: example,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CursorPaginatedResponseDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
