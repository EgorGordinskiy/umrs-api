import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiSortingQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'sorting',
      required: false,
      type: 'string',
      description: 'Способ сортировки',
      examples: {
        empty: {
          value: undefined,
          summary: 'Без сортировки',
        },
        decs: {
          value: 'title:desc',
          summary: 'Сортировка по убыванию',
        },
        asc: {
          value: 'title:asc',
          summary: 'Сортировка по возрастанию',
        },
      },
    }),
  );
}
