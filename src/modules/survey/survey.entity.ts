import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurveySchema } from './survey-schema/survey-schema.entity';
import { SurveyResponse } from './survey-response/survey-response.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Название анкеты
   */
  @Column({ type: 'varchar', length: 255 })
  title: string;

  /**
   * Описание анкеты
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * Флаг активности анкеты
   */
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  /**
   * Дата и время создания
   * @example "2023-05-15T10:00:00.000Z"
   */
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  /**
   * Дата и время последнего обновления
   * @example "2023-05-15T11:30:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  /**
   * Схема анкеты
   */
  @ManyToOne(() => SurveySchema, (schema) => schema.surveys)
  schema: SurveySchema;

  @Column({ type: 'uuid' })
  schemaId: string;

  /**
   * Ответы анкеты
   */
  @OneToMany(() => SurveyResponse, (response) => response.survey)
  responses: SurveyResponse[];

  // createdBy, modifiedBy
}
