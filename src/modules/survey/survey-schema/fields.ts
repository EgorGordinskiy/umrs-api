import { VisibilityCondition } from './blocks';

/**
 * Базовый интерфейс для всех полей
 */
export interface BaseField {
  /** Уникальный ID */
  id: string;
  /** Ключ поля */
  key: string;
  /** Тип поля */
  type: string;
  /** Лейбл */
  label: string;
  /** Обязательное поле */
  required: boolean;
  /** Видимость */
  visible?: boolean | VisibilityCondition;
  /** Значение по умолчанию */
  defaultValue?: unknown;
}

export const ADDRESS_FIELD_TYPE_VALUE = 'address';
export type AddressFieldType = typeof ADDRESS_FIELD_TYPE_VALUE;

export const ADDRESS_INPUT_TYPE_VALUE = {
  MAP: 'map',
  SUGGESTIONS: 'suggestions',
} as const;
export type AddressFieldInputType =
  (typeof ADDRESS_INPUT_TYPE_VALUE)[keyof typeof ADDRESS_INPUT_TYPE_VALUE];

/** Текстовое поле */
export interface AddressField extends BaseField {
  type: AddressFieldType;
  inputType?: AddressFieldInputType;
}

export const TEXT_FIELD_TYPE_VALUE = 'text';
export type TextFieldType = typeof TEXT_FIELD_TYPE_VALUE;

/** Текстовое поле */
export interface TextField extends BaseField {
  type: TextFieldType;
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
}

export const NUMBER_KIND = {
  INTEGER: 'integer',
  FLOAT: 'float',
} as const;

export type NumberKindType = (typeof NUMBER_KIND)[keyof typeof NUMBER_KIND];

export const NUMBER_FIELD_TYPE_VALUE = 'number';
export type NumberFieldType = typeof NUMBER_FIELD_TYPE_VALUE;

/** Числовое поле */
export interface NumberField extends BaseField {
  type: NumberFieldType;
  min?: number;
  max?: number;
  numberKind: NumberKindType;
  maxPrecision?: number;
}
export const SELECT_FIELD_TYPE_VALUE = 'select';
export type SelectFieldType = typeof SELECT_FIELD_TYPE_VALUE;

/** Выпадающий список */
export interface SelectField extends BaseField {
  type: SelectFieldType;
  options: Option[];
  multiple?: boolean;
}

export const RADIO_FIELD_TYPE_VALUE = 'radio';
export type RadioFieldType = typeof RADIO_FIELD_TYPE_VALUE;

/** Группа радио-кнопок */
export interface RadioField extends BaseField {
  type: RadioFieldType;
  options: Option[];
}

export const CHECKBOX_FIELD_TYPE_VALUE = 'checkbox';
export type CheckboxFieldType = typeof CHECKBOX_FIELD_TYPE_VALUE;

/** Группа чекбоксов */
export interface CheckboxField extends BaseField {
  type: CheckboxFieldType;
  options?: Option[];
}

export const DATE_FIELD_TYPE_VALUE = 'date';
export type DateFieldType = typeof DATE_FIELD_TYPE_VALUE;

/** Поле выбора даты */
export interface DateField extends BaseField {
  type: DateFieldType;
  min?: Date;
  max?: Date;
  isRange?: boolean;
  includeTime?: boolean;
}

export const TIME_FIELD_TYPE_VALUE = 'time';
export type TimeFieldType = typeof TIME_FIELD_TYPE_VALUE;

export interface TimeField extends BaseField {
  type: TimeFieldType;
  min?: Date;
  max?: Date;
  isRange?: boolean;
}

/** Опция для выбора */
export interface Option {
  /** Значение */
  value: string;
  /** Отображаемый текст */
  label: string;
}

/** Объединенный тип полей */
export type SurveyField =
  | TextField
  | NumberField
  | SelectField
  | RadioField
  | CheckboxField
  | AddressField
  | DateField;
