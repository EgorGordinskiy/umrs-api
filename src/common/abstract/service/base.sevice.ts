import type { DeepPartial } from 'typeorm';

/**
 * Интерфейс, который гарантирует наличие поля `id` в сущности.
 */
export interface EntityWithId {
  readonly id: number;
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
   * @returns {Promise<T[]>} Список всех сущностей.
   */
  findAll(): Promise<T[]>;
  /**
   * Найти сущность по ID.
   * @param {number} id - Идентификатор сущности.
   * @returns {Promise<T>} Найденная сущность.
   * @throws {NotFoundException} Если сущность не найдена.
   */
  findOne(id: number): Promise<T>;
  /**
   * Создать новую сущность.
   * @param {CreateDto} createDto - DTO для создания сущности.
   * @returns {Promise<T>} Созданная сущность.
   */
  create(createDto: CreateDto): Promise<T>;
  /**
   * Обновить существующую сущность.
   * @param {number} id - Идентификатор сущности.
   * @param {UpdateDto} updateDto - DTO для обновления сущности.
   * @returns {Promise<T>} Обновленная сущность.
   */
  update(id: number, updateDto: UpdateDto): Promise<T>;
  /**
   * Удалить сущность по ID.
   * @param {number} id - Идентификатор сущности.
   * @returns {Promise<void>}
   */
  remove(id: number): Promise<void>;
  /**
   * Проверяет, существует ли сущность c заданным id.
   * @param {DeepPartial<T>} id - ID.
   * @returns {Promise<boolean>} `true`, если сущность существует, иначе `false`.
   */
  existsById(id: number): Promise<boolean>;
}
