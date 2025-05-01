import { NotFoundException } from '@nestjs/common';
import type { BaseService, EntityWithId } from './base.sevice';
import { type DeepPartial, type FindOptionsWhere, Repository } from 'typeorm';

/**
 * Базовая реализация сервиса для работы с сущностями.
 * @template T - Тип сущности.
 * @template CreateDto - Тип DTO для создания сущности.
 * @template UpdateDto - Тип DTO для обновления сущности.
 */
export abstract class BaseServiceImpl<
  T extends EntityWithId,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends DeepPartial<T>,
> implements BaseService<T, CreateDto, UpdateDto>
{
  protected constructor(protected readonly repository: Repository<T>) {}

  public async findAll(): Promise<T[]> {
    return this.repository.find({ cache: 60000 });
  }

  public async findOne(id: number | string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      cache: 60000,
    });

    if (!entity) {
      throw new NotFoundException(
        `Сущность ${this.name} с ID ${id} не найдена.`,
      );
    }

    return entity;
  }

  public async create(dto: CreateDto): Promise<T> {
    const entity = this.repository.create(dto);

    return await this.repository.save(entity);
  }

  public async createMany(
    dto: CreateDto[],
    makeFunc: (dto: CreateDto) => T | Promise<T>,
  ): Promise<T[]> {
    const entities = await Promise.all(dto.map((dto) => makeFunc(dto)));

    return this.repository.save(entities);
  }

  public async update(id: number | string, dto: UpdateDto): Promise<T> {
    const entity = await this.findOne(id);

    Object.assign(entity, dto);

    return this.repository.save(entity);
  }

  public async remove(id: number | string): Promise<void> {
    const entity = await this.findOne(id);

    await this.repository.remove(entity);
  }

  public async existsById(id: number | string): Promise<boolean> {
    return this.repository.existsBy({ id } as FindOptionsWhere<T>);
  }

  private get name() {
    return this.repository.metadata.name;
  }
}
