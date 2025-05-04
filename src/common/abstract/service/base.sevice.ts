import type { DeepPartial } from 'typeorm';
// Импорт для JSDoc
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NotFoundException } from '@nestjs/common';
import { Sorting } from '../../features/sorting';
import { Filtering } from '../../features/filtering';

/**
 * Интерфейс, который гарантирует наличие поля `id` в сущности.
 */
export interface EntityWithId {
  readonly id: unknown; // может быть string (uuid) или number
}

/**
 * Интерфейс для базового сервиса
 * @template T - Тип сущности, с которой работает сервис.
 * @template CreateDto - Тип DTO для создания сущности.
 * @template UpdateDto - Тип DTO для обновления сущности.
 */
export interface BaseService<
  T extends EntityWithId,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends DeepPartial<T>,
> {
  /**
   * Получить все сущности.
   * @param {Sorting} sorting - Способ сортировки.
   * @param {Filtering} filtering - Способ фильтрации.
   * @returns {Promise<T[]>} Список всех сущностей.
   */
  findAll(sorting?: Sorting, filtering?: Filtering): Promise<T[]>;
  /**
   * Найти сущность по ID.
   * @param {number} id - Идентификатор сущности.
   * @returns {Promise<T>} Найденная сущность.
   * @throws {NotFoundException} Если сущность не найдена.
   */
  findOne(id: number | string): Promise<T>;
  /**
   * Создать новую сущность.
   * @param {CreateDto} createDto - DTO для создания сущности.
   * @returns {Promise<T>} Созданная сущность.
   */
  create(createDto: CreateDto): Promise<T>;
  /**
   * Создать несколько новых сущностей.
   * @param {CreateDto[]} createDto - DTO для создания сущностей.
   * @param {(dto: CreateDto) => T} makeFunc - Функция, которая создает сущность из DTO.
   * @returns {Promise<T[]>} Созданные сущности.
   */
  createMany(
    createDto: CreateDto[],
    makeFunc: (dto: CreateDto) => T | Promise<T>,
  ): Promise<T[]>;
  /**
   * Обновить существующую сущность.
   * @param {number} id - Идентификатор сущности.
   * @param {UpdateDto} updateDto - DTO для обновления сущности.
   * @returns {Promise<T>} Обновленная сущность.
   */
  update(id: number | string, updateDto: UpdateDto): Promise<T>;
  /**
   * Удалить сущность по ID.
   * @param {number} id - Идентификатор сущности.
   * @returns {Promise<void>}
   */
  remove(id: number | string): Promise<void>;
  /**
   * Удалить сущности по массиву идентификаторов.
   * @param ids - Массив идентификаторов сущностей.
   * @returns {Promise<void>}
   */
  removeMany(ids: number[] | string[]): Promise<void>;
  /**
   * Проверяет, существует ли сущность c заданным id.
   * @param {DeepPartial<T>} id - ID.
   * @returns {Promise<boolean>} `true`, если сущность существует, иначе `false`.
   */
  existsById(id: number | string): Promise<boolean>;
}
