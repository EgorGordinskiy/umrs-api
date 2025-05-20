import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiCursorPaginatedRequest = () => {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      required: true,
      type: 'number',
      description: 'Количество записей в ответе',
      examples: {
        default: {
          value: 10,
        },
      },
    }),
    ApiQuery({
      name: 'cursor',
      required: false,
      type: 'string',
      description: 'Курсор для получения следующей группы записей',
      examples: {
        empty: {
          value: undefined,
        },
        default: {
          value:
            'MjAyNS0wMy0zMFQxODozNTozMS43OTBaXzY3YzkzMDdhLWZhZTktNGE3Zi05ZjEwLTlkOTg5MWQ0NWEzMw==',
        },
      },
    }),
  );
};
