import { GisFieldType } from './field-type.entity';
import { CreateGisFieldTypeDto } from './dto/create-gis-field-type.dto';
import { UpdateGisFieldTypeDto } from './dto/update-gis-field-type.dto';
import { GisFieldTypeService } from './gis-field-type.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiFindAll } from 'src/common/decorators';

@Controller('gis-field-type')
export class GisFieldTypeController {
  constructor(private readonly service: GisFieldTypeService) {}

  @Get()
  @ApiFindAll(GisFieldType)
  public async findAll(): Promise<GisFieldType[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно получена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number): Promise<GisFieldType> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiBody({ type: CreateGisFieldTypeDto })
  @ApiResponse({ status: 201, description: 'Запись успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async create(
    @Body() dto: CreateGisFieldTypeDto,
  ): Promise<GisFieldType> {
    return await this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiBody({ type: UpdateGisFieldTypeDto })
  @ApiResponse({ status: 200, description: 'Запись успешно обновлена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateGisFieldTypeDto,
  ) {
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
