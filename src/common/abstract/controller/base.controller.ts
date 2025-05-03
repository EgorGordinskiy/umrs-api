import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BaseService, EntityWithId } from '../service';
import { DeepPartial } from 'typeorm';
import { Sorting, SortingParams } from '../../decorators/params/SortingParams';
import {
  Filtering,
  FilteringParams,
} from '../../decorators/params/FilteringParms';

export abstract class BaseCrudController<
  EntityType extends EntityWithId,
  CreateDto extends DeepPartial<EntityType>,
  UpdateDto extends DeepPartial<EntityType>,
> {
  constructor(
    protected readonly service: BaseService<EntityType, CreateDto, UpdateDto>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Получить все записи' })
  @ApiOkResponse({ description: 'Записи успешно получены.' })
  @ApiQuery({
    name: 'sorting',
    required: false,
    type: 'string',
    description: 'Способ сортировки',
    examples: {
      empty: {
        value: undefined,
        summary: 'Без сортировки',
      },
      decs: {
        value: 'title:desc',
        summary: 'Сортировка по убыванию',
      },
      asc: {
        value: 'title:asc',
        summary: 'Сортировка по возрастанию',
      },
    },
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: 'string',
    description: 'Способ фильтрации',
    examples: {
      empty: {
        value: undefined,
        summary: 'Без фильтрации',
      },
      default: {
        value: 'title:eq:A',
        summary: 'Фильтр по значению',
      },
    },
  })
  public async findAll(
    @SortingParams() sorting?: Sorting,
    @FilteringParams() filter?: Filtering,
  ): Promise<EntityType[]> {
    return await this.service.findAll(sorting, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID записи' })
  @ApiOkResponse({ description: 'Запись успешно получена.' })
  @ApiNotFoundResponse({ description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number | string): Promise<EntityType> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiCreatedResponse({ description: 'Запись успешно создана.' })
  @ApiBadRequestResponse({ description: 'Некорректные данные.' })
  public async create(@Body() dto: CreateDto): Promise<EntityType> {
    return await this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID записи' })
  @ApiOkResponse({ description: 'Запись успешно обновлена.' })
  @ApiNotFoundResponse({ description: 'Запись не найдена.' })
  public async update(
    @Param('id') id: number | string,
    @Body() dto: UpdateDto,
  ): Promise<EntityType> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись по ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID записи' })
  @ApiOkResponse({ description: 'Запись успешно удалена.' })
  @ApiNotFoundResponse({ description: 'Запись не найдена.' })
  public async remove(@Param('id') id: number | string): Promise<void> {
    return await this.service.remove(id);
  }
}
