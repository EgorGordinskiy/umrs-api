import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { BaseService, EntityWithId } from '../service';
import { DeepPartial } from 'typeorm';
import {
  ApiOffsetPagination,
  OffsetPaginated,
  OffsetPaginatedResponse,
  OffsetPaginationParams,
} from '../../features/offset-pagination';
import {
  ApiFilteringQuery,
  Filtering,
  FilteringParams,
} from '../../features/filtering';
import {
  ApiSortingQuery,
  Sorting,
  SortingParams,
} from '../../features/sorting';

export abstract class BaseCrudController<
  EntityType extends EntityWithId,
  CreateDto extends DeepPartial<EntityType>,
  UpdateDto extends DeepPartial<EntityType>,
> {
  constructor(
    protected readonly service: BaseService<EntityType, CreateDto, UpdateDto>,
  ) {}

  @Get('offset')
  @ApiOperation({ summary: 'Получить все записи постранично через отступ.' })
  @ApiOkResponse({ description: 'Записи успешно получены.' })
  @ApiSortingQuery()
  @ApiFilteringQuery()
  @ApiOffsetPagination()
  public async findAllOffsetPaginated(
    @OffsetPaginationParams() pagination: OffsetPaginated,
    @SortingParams() sorting?: Sorting,
    @FilteringParams() filter?: Filtering,
  ): Promise<OffsetPaginatedResponse<EntityType>> {
    return await this.service.findAllOffsetPaginated(
      pagination,
      sorting,
      filter,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получить все записи' })
  @ApiOkResponse({ description: 'Записи успешно получены.' })
  @ApiSortingQuery()
  @ApiFilteringQuery()
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
