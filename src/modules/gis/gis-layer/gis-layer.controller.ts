import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { GisLayerService } from './gis-layer.service';
import { GisLayer } from './gis-layer.entity';
import { CreateGisLayerDto } from './dto/create-gis-layer.dto';
import { UpdateGisLayerDto } from './dto/update-gis-layer.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiFindAll } from 'src/common/decorators';

@Controller('gis-layer')
export class GisLayerController {
  constructor(private readonly service: GisLayerService) {}

  @Get()
  @ApiFindAll(GisLayer)
  public async findAll(): Promise<GisLayer[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно получена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number): Promise<GisLayer> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiBody({ type: CreateGisLayerDto })
  @ApiResponse({ status: 201, description: 'Запись успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async create(@Body() dto: CreateGisLayerDto): Promise<GisLayer> {
    return await this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiBody({ type: UpdateGisLayerDto })
  @ApiResponse({ status: 200, description: 'Запись успешно обновлена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async update(@Param('id') id: number, @Body() dto: UpdateGisLayerDto) {
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
