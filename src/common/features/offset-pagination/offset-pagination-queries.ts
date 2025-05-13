import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiOffsetPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Номер страницы',
    }),
    ApiQuery({
      name: 'size',
      required: false,
      type: Number,
      description: 'Размер страницы',
    }),
  );
}
