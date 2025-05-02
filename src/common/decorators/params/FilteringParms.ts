import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { FilterRule } from '../../../database/extensions';

/**
 * Интерфейс критерия фильтрации для запросов.
 *
 * @property property - Поле для фильтрации.
 * @property rule - Правило фильтрации, основанное на FilterRule.
 * @property value - Значение для фильтрации (необязательно для некоторых правил).
 */
export interface Filtering {
  property: string;
  rule: FilterRule;
  value?: string;
}

/**
 * Декоратор для извлечения и проверки параметров фильтрации в GET запросе.
 *
 * @param allowedFields - Массив с разрешенными свойствами для фильтрации.
 * @returns Объект фильтрации или null, если фильтр не предоставлен.
 */
export const FilteringParams = createParamDecorator(
  (allowedFields: string[] = [], ctx: ExecutionContext): Filtering | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) return null;

    if (
      // todo вытащить в regex конструктор и привязать к enum и прочему
      !filter.match(
        /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,-]+$/,
      ) &&
      !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    ) {
      throw new BadRequestException('Неверный формат фильтра');
    }

    const parts = filter.split(':');
    const property = parts[0];
    const rule = parts[1] as FilterRule;
    const value = parts.length > 2 ? parts.slice(2).join(':') : undefined;

    if (
      Array.isArray(allowedFields) &&
      allowedFields.length > 0 &&
      !allowedFields.includes(property)
    ) {
      throw new BadRequestException(
        `Неверное свойство для фильтрации: ${property}`,
      );
    }

    if (!Object.values(FilterRule).includes(rule)) {
      throw new BadRequestException(`Неверное правило фильтрации: ${rule}`);
    }

    return { property, rule, value };
  },
);
