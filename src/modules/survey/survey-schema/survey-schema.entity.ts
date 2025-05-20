import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../survey.entity';
import { DynamicListBlock, SectionBlock } from './blocks';

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

export const SURVEY_ACTION_TYPE_VALUES = {
  SUBMIT: 'submit',
  RESET: 'reset',
  ADD_LIST_ITEM: 'add-list-item',
  REMOVE_LIST_ITEM: 'remove-list-item',
} as const;

export type SurveyActionType =
  (typeof SURVEY_ACTION_TYPE_VALUES)[keyof typeof SURVEY_ACTION_TYPE_VALUES];

/**
 * Базовый интерфейс для всех действий
 */
export interface SurveyAction {
  /** Тип действия */
  type: SurveyActionType;
  /** Текстовая метка */
  label: string;
  /** Флаг отображения иконки */
  icon: boolean;
}
