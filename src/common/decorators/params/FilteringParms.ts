import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  Logger,
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
 * Опции для декоратора FilteringParams.
 * @property key - имя query-параметра, в котором ожидается фильтр (например, `filter`)
 * @property allowedFields - список разрешённых свойств для фильтрации
 */
export interface FilteringParamsOptions {
  key: string;
  allowedFields?: string[];
}

/**
 * Type guard для FilterRule.
 */
function isFilterRule(value: string): value is FilterRule {
  return Object.values(FilterRule).includes(value as FilterRule);
}

/**
 * Декоратор для извлечения и проверки параметров фильтрации в GET запросе.
 * Использует динамически построенный regex на основе FilterRule enum.
 *
 * @param options - FilteringParamsOptions с ключом и разрешёнными полями.
 * @returns Объект фильтрации или null, если фильтр не предоставлен.
 */
export const FilteringParams = createParamDecorator(
  (
    options: FilteringParamsOptions = { key: 'filter' },
    ctx: ExecutionContext,
  ): Filtering | undefined => {
    const req: Request = ctx.switchToHttp().getRequest();
    // опять же тоже только один фильтр поддерживается на данный момент

    if (!req.query[options.key]) {
      Logger.warn(`Параметр с именем ${options.key} не найден`);
      return undefined;
    }
    const filter = req.query[options.key] as string;
    if (!filter) return undefined;

    // Regex группы правил для regex из FilterRule enum
    const filterRules = Object.values(FilterRule);

    const ruleGroupsRequiringValue = filterRules
      .filter(
        (rule) =>
          rule !== FilterRule.IS_NULL && rule !== FilterRule.IS_NOT_NULL,
      )
      .join('|');

    const ruleGroupsNotRequiringValue = [
      FilterRule.IS_NULL,
      FilterRule.IS_NOT_NULL,
    ].join('|');

    let property: string;
    let rule: string;
    let value: string | undefined;

    // Проверка если это будет фильтр, требующий value
    const patternWithValue = new RegExp(
      `^([a-zA-Z0-9_-]+):(${ruleGroupsRequiringValue}):(.+)$`,
    );
    let match = filter.match(patternWithValue);
    if (match) {
      property = match[1];
      rule = match[2];
      value = match[3];
    } else {
      // Проверка если это будет фильтр, не требующий value (например, isnull/isnotnull)
      const patternWithoutValue = new RegExp(
        `^([a-zA-Z0-9_-]+):(${ruleGroupsNotRequiringValue})$`,
      );
      match = filter.match(patternWithoutValue);
      if (match) {
        property = match[1];
        rule = match[2];
        value = undefined;
      } else {
        throw new BadRequestException('Неверный формат фильтра');
      }
    }

    // Проверка разрешённых полей для фильтрации
    if (
      Array.isArray(options.allowedFields) &&
      options.allowedFields.length > 0 &&
      !options.allowedFields.includes(property)
    ) {
      throw new BadRequestException(
        `Неверное свойство для фильтрации: ${property}`,
      );
    }

    // Проверка валидности правила фильтрации
    if (!isFilterRule(rule)) {
      throw new BadRequestException(`Неверное правило фильтрации: ${rule}`);
    }

    return { property, rule, value };
  },
);
