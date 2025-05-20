import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { SortDirection } from '../../../database/extensions';
import { getEnumRegexGroup } from '../../utilFunctions';

// сейчас может быть не особо понятно почему нельзя сразу возвращать
// `{ [property: string]: SortDirection }` тип,
// но теоретически при добавлении функциональности в SortingParams интерфейс станет полезнее
export interface Sorting {
  property: string;
  direction: SortDirection;
}

/**
 * Аргументы для декоратора SortingParams.
 */
export interface SortingParamsOptions {
  /** Имя параметра для сортировки */
  key: string;
  /** Допустимые значения для сортировки */
  validParams?: string[];
}

/**
 * Type guard для SortDirection.
 */
function isSortDirection(value: string): value is SortDirection {
  return Object.values(SortDirection).includes(value as SortDirection);
}

export const SortingParams = createParamDecorator(
  (
    options: SortingParamsOptions = { key: 'sorting' },
    ctx: ExecutionContext,
  ) => {
    // пока что пусть будет сортировка только по одному полю, т.е. ...?sort=createdAt:desc
    // потом может надо будет сделать поддержку `...?sort=createdAt:desc,id:asc,...`
    // по вложенным свойствам объектов сортировать тоже нельзя
    const req: Request = ctx.switchToHttp().getRequest();

    if (!req.query[options.key]) {
      Logger.warn(`Параметр с именем ${options.key} не найден`);
      return undefined;
    }
    const sort = req.query[options.key] as string;
    if (!sort) {
      return undefined;
    }

    // создать regex на основе всех enum значений SortDirection
    const directionGroup = getEnumRegexGroup(SortDirection);
    const sortPattern = new RegExp(`^([a-zA-Z0-9_-]+):(${directionGroup})$`);

    const match = sort.match(sortPattern);
    if (!match) throw new BadRequestException('Неверный формат сортировки');

    const property = match[1];
    const direction = match[2];

    if (
      options.validParams &&
      Array.isArray(options.validParams) &&
      !options.validParams.includes(property)
    ) {
      throw new BadRequestException(
        `Недопустимое свойство для сортировки: ${property}`,
      );
    }

    if (!isSortDirection(direction)) {
      throw new BadRequestException(
        `Недопустимое направление сортировки: ${direction}`,
      );
    }

    return { property, direction };
  },
);
