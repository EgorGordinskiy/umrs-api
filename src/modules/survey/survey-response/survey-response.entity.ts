/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../survey.entity';

/**
 * Сущность ответа на анкету
 * @remarks
 * Хранит данные ответов пользователей на анкеты
 */
@Entity()
export class SurveyResponse {
  /**
   * Уникальный идентификатор ответа
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * Данные ответа в формате JSON
   * @example { "name": "Иван", "age": 30 }
   */
  @Column({ type: 'jsonb' })
  data: Record<string, any>;
  /**
   * Дата и время создания ответа
   * @example "2023-05-15T10:00:00.000Z"
   */
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  /**
   * Дата и время последнего обновления ответа
   * @example "2023-05-15T11:30:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
  /**
   * Анкета, к которой относится этот ответ
   */
  @ManyToOne(() => Survey, (survey) => survey.responses, {
    onDelete: 'CASCADE', // Удаление ответов при удалении анкеты
  })
  survey: Survey;
  /**
   * Дополнительные метаданные ответа
   * @example { "userAgent": "Mozilla/5.0" }
   */
  @Column({ type: 'jsonb', nullable: true })
  metadata?: ResponseMetadata;
}

/**
 * Интерфейс метаданных ответа на анкету
 */
export interface ResponseMetadata {
  userAgent?: string;
  /** Время, затраченное на заполнение (в секундах) */
  timeSpent?: number;
  /** Устройство пользователя */
  device?: {
    /** Тип устройства */
    type?: 'desktop' | 'mobile' | 'tablet';
    /** Операционная система */
    os?: string;
    /** Браузер */
    browser?: string;
  };
}
