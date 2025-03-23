import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiFindAll<Entity>(entity: new () => Entity) {
  return applyDecorators(
    ApiOperation({ summary: 'Получить все записи' }),
    ApiResponse({
      status: 200,
      description: 'Записи успешно получены.',
      type: [entity],
    }),
  );
}
