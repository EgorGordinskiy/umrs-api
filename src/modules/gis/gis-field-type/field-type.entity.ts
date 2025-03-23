import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GisField } from '../gis-field/gis-field.entity';

/**
 * Перечисление типов.
 */
export enum FieldType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
}

/**
 * Сущность, представляющая тип поля.
 */
@Entity()
export class GisFieldType {
  /**
   * Уникальный идентификатор.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Тип.
   */
  @Column({
    type: 'enum',
    enum: FieldType,
    unique: true,
  })
  type: FieldType;

  /**
   * Описание типа.
   */
  @Column()
  description: string;

  /**
   * Список полей, связанных с этим типом.
   */
  @OneToMany(() => GisField, (field) => field.type)
  fields: GisField[];
}
