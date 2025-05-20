import { SurveyField } from './fields';
import { SurveyAction } from './survey-schema.entity';

/**
 * Базовый интерфейс для всех блоков
 */
export interface BaseBlock {
  /** Уникальный идентификатор */
  id: string;
  /** Тип блока */
  type: DynamicListBlockType | SectionBlockType;
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
}

export const SECTION_TYPE_VALUE = 'section';
export type SectionBlockType = typeof SECTION_TYPE_VALUE;

/**
 * Секция с группой полей
 */
export interface SectionBlock extends BaseBlock {
  type: SectionBlockType;
  /** Поля внутри секции */
  fields: SurveyField[];
}

export const DYNAMIC_LIST_TYPE_VALUE = 'dynamic-list';
export type DynamicListBlockType = typeof DYNAMIC_LIST_TYPE_VALUE;

/**
 * Динамический повторяющийся блок полей
 */
export interface DynamicListBlock extends BaseBlock {
  type: DynamicListBlockType;
  /** Минимальное количество элементов */
  minItems?: number;
  /** Максимальное количество элементов */
  maxItems?: number;
  /** Шаблон элемента */
  item: {
    /** Поля элемента */
    fields: SurveyField[];
    /** Действия элемента */
    actions?: SurveyAction[];
  };
  /** Действия списка */
  actions?: SurveyAction[];
}

/** Условие видимости */
export type VisibilityCondition =
  | SimpleCondition
  | AndCondition
  | OrCondition
  | NotCondition;

/** Простое условие */
interface SimpleCondition {
  /**
   * Тип условия сравнения:
   * - 'eq' (equal) - равно значению
   * - 'ne' (not equal) - не равно значению
   * - 'gt' (greater than) - больше значения
   * - 'lt' (less than) - меньше значения
   * - 'contains' - содержит значение (для строк)
   *
   * @example 'eq' // Проверка на равенство
   * @example 'contains' // Проверка наличия подстроки
   */
  type: 'eq' | 'ne' | 'gt' | 'lt' | 'contains';
  /**
   * ID поля, от которого зависит видимость текущего поля
   * @pattern ^[a-z0-9-]+$ // Допустимы буквы, цифры и дефисы
   * @example "age-field" // Ссылка на поле с возрастом
   */
  fieldId: string;
  /**
   * Значение для сравнения
   * @example 18 // Для числовых сравнений
   * @example "premium" // Для строковых сравнений
   */
  value: string | number;
}

export const AND_CONDITION_TYPE_VALUE = 'and';
export type AndConditionType = typeof AND_CONDITION_TYPE_VALUE;

export const OR_CONDITION_TYPE_VALUE = 'or';
export type OrConditionType = typeof OR_CONDITION_TYPE_VALUE;

export const NOT_CONDITION_TYPE_VALUE = 'not';
export type NotConditionType = typeof NOT_CONDITION_TYPE_VALUE;

export type ConditionType =
  | AndConditionType
  | OrConditionType
  | NotConditionType;

/** Логическое И */
interface AndCondition {
  type: AndConditionType;
  conditions: VisibilityCondition[];
}

/** Логическое ИЛИ */
interface OrCondition {
  type: OrConditionType;
  conditions: VisibilityCondition[];
}

/** Логическое НЕ */
interface NotCondition {
  type: NotConditionType;
  condition: VisibilityCondition;
}
