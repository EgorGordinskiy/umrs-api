import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BaseService, EntityWithId } from '../service';
import { DeepPartial } from 'typeorm';

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
  @ApiResponse({
    status: 200,
    description: 'Записи успешно получены.',
  })
  public async findAll(): Promise<EntityType[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно получена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number): Promise<EntityType> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiResponse({ status: 201, description: 'Запись успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async create(@Body() dto: CreateDto): Promise<EntityType> {
    return await this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно обновлена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateDto,
  ): Promise<EntityType> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно удалена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async remove(@Param('id') id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
