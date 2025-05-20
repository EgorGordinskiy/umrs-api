import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiFilteringQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'filter',
      required: false,
      type: 'string',
      description: 'Способ фильтрации',
      examples: {
        empty: {
          value: undefined,
          summary: 'Без фильтрации',
        },
        default: {
          value: 'title:eq:A',
          summary: 'Фильтр по значению',
        },
      },
    }),
  );
}
