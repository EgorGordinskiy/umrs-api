/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsNull,
  Not,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ILike,
  In,
} from 'typeorm';
import { Filtering } from '../common/features/filtering';
import { Sorting } from '../common/features/sorting';

export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
}

// немного костыльно с тех пор, как есть в typeorm свой SortDirection, но с таким
// enum как-то удобнее
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Возвращает объект, представляющий порядок сортировки на основе
 * предоставленного параметра Sorting. Если сортировка не указана,
 * возвращается пустой объект.
 *
 * @param sort - Объект сортировки, содержащий свойство и направление.
 * @returns Объект со свойством в качестве ключа и направлением в качестве значения или пустой объект.
 */
export const getOrder = (sort: Sorting) => {
  return sort ? { [sort.property]: sort.direction } : {};
};

/**
 * Генерирует объект фильтрации для TypeORM из переданного списка свойств.
 * @param filter - критерий фильтрации.
 * @returns объект фильтрации для TypeORM.
 */
export const getWhere = (filter: Filtering): Record<string, any> => {
  if (!filter) return {};

  const { property, rule, value } = filter;

  switch (rule) {
    case FilterRule.IS_NULL:
      return { [property]: IsNull() };
    case FilterRule.IS_NOT_NULL:
      return { [property]: Not(IsNull()) };
    case FilterRule.EQUALS:
      return { [property]: value };
    case FilterRule.NOT_EQUALS:
      return { [property]: Not(value) };
    case FilterRule.GREATER_THAN:
      return { [property]: MoreThan(value) };
    case FilterRule.GREATER_THAN_OR_EQUALS:
      return { [property]: MoreThanOrEqual(value) };
    case FilterRule.LESS_THAN:
      return { [property]: LessThan(value) };
    case FilterRule.LESS_THAN_OR_EQUALS:
      return { [property]: LessThanOrEqual(value) };
    case FilterRule.LIKE:
      return { [property]: ILike(`%${value}%`) };
    case FilterRule.NOT_LIKE:
      return { [property]: Not(ILike(`%${value}%`)) };
    case FilterRule.IN:
      return { [property]: In(String(value).split(',')) };
    case FilterRule.NOT_IN:
      return { [property]: Not(In(String(value).split(','))) };
    default:
      return {};
  }
};
