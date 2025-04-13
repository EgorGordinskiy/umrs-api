import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../survey.entity';

/**
 * Сущность схемы анкеты
 */
@Entity()
export class SurveySchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'jsonb' })
  structure: SurveySchemaStructure;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => Survey, (survey) => survey.schema)
  surveys: Survey[];
}

export interface SurveySchemaStructure {
  blocks: Array<SectionBlock | DynamicListBlock>;
  actions?: Array<SurveyAction>;
}

/**
 * Базовый интерфейс для всех действий
 */
export interface SurveyAction {
  /** Тип действия */
  type: 'submit' | 'reset' | 'add-list-item' | 'remove-list-item';
  /** Текстовая метка */
  label: string;
  /** Флаг отображения иконки */
  icon: boolean;
}

/**
 * Базовый интерфейс для всех блоков
 */
export interface BaseBlock {
  /** Уникальный идентификатор */
  id: string;
  /** Тип блока */
  type: 'section' | 'dynamic-list';
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
}

/**
 * Секция с группой полей
 */
export interface SectionBlock extends BaseBlock {
  type: 'section';
  /** Поля внутри секции */
  fields: SurveyField[];
}

/**
 * Динамический повторяющийся блок полей
 */
export interface DynamicListBlock extends BaseBlock {
  type: 'dynamic-list';
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
}

/** Текстовое поле */
export interface AddressField extends BaseField {
  type: 'address';
  inputType?: 'map' | 'suggestions';
}

/** Текстовое поле */
export interface TextField extends BaseField {
  type: 'text';
  minLength?: number;
  maxLength?: number;
}

/** Числовое поле */
export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
}

/** Выпадающий список */
export interface SelectField extends BaseField {
  type: 'select';
  options: Option[];
}

/** Группа радио-кнопок */
export interface RadioField extends BaseField {
  type: 'radio';
  options: Option[];
}

/** Группа чекбоксов */
export interface CheckboxField extends BaseField {
  type: 'checkbox';
  options?: Option[];
}

/** Поле выбора даты */
export interface DateField extends BaseField {
  type: 'date';
}

/** Опция для выбора */
export interface Option {
  /** Значение */
  value: string;
  /** Отображаемый текст */
  label: string;
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

/** Логическое И */
interface AndCondition {
  type: 'and';
  conditions: VisibilityCondition[];
}

/** Логическое ИЛИ */
interface OrCondition {
  type: 'or';
  conditions: VisibilityCondition[];
}

/** Логическое НЕ */
interface NotCondition {
  type: 'not';
  condition: VisibilityCondition;
}

/** Объединенный тип полей */
export type SurveyField =
  | TextField
  | NumberField
  | SelectField
  | RadioField
  | CheckboxField
  | DateField;
