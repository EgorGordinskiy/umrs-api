import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { GisField } from './gis-field.entity';
import { CreateGisFieldDto } from './dto/create-gis-field.dto';
import { UpdateGisFieldDto } from './dto/update-gis-field.dto';
import { GisFieldService } from './gis-field.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiFindAll } from 'src/common/decorators';

@Controller('gis-field')
export class GisFieldController {
  constructor(private readonly service: GisFieldService) {}

  @Get()
  @ApiFindAll(GisField)
  public async findAll(): Promise<GisField[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно получена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number): Promise<GisField> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiBody({ type: CreateGisFieldDto })
  @ApiResponse({ status: 201, description: 'Запись успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async create(@Body() dto: CreateGisFieldDto): Promise<GisField> {
    return await this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiBody({ type: UpdateGisFieldDto })
  @ApiResponse({ status: 200, description: 'Запись успешно обновлена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async update(@Param('id') id: number, @Body() dto: UpdateGisFieldDto) {
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
