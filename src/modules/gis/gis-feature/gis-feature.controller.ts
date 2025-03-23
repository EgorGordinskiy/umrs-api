import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GisFeatureService } from './gis-feature.service';
import { GisFeature } from './gis-feature.entity';
import { ApiFindAll } from 'src/common/decorators';
import { UpdateGisFeatureDto } from './dto/update-gis-feature.dto';
import {
  CreateGisFeatureDto,
  CreateGisFeaturesDto,
} from './dto/create-gis-feature.dto';

@Controller('gis-feature')
export class GisFeatureController {
  constructor(private readonly service: GisFeatureService) {}

  @Get()
  @ApiFindAll(GisFeature)
  public async findAll(): Promise<GisFeature[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiResponse({ status: 200, description: 'Запись успешно получена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async findOne(@Param('id') id: number): Promise<GisFeature> {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую запись' })
  @ApiBody({ type: CreateGisFeatureDto })
  @ApiResponse({ status: 201, description: 'Запись успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async create(@Body() dto: CreateGisFeatureDto): Promise<GisFeature> {
    return await this.service.create(dto);
  }

  @Post('many')
  @ApiOperation({ summary: 'Создать несколько записей' })
  @ApiBody({ type: CreateGisFeaturesDto })
  @ApiResponse({ status: 201, description: 'Записи успешно созданы.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  public async createMany(
    @Body() dto: CreateGisFeaturesDto,
  ): Promise<GisFeature[]> {
    return await this.service.createMany(dto.features);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить запись по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID записи' })
  @ApiBody({ type: UpdateGisFeatureDto })
  @ApiResponse({ status: 200, description: 'Запись успешно обновлена.' })
  @ApiResponse({ status: 404, description: 'Запись не найдена.' })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateGisFeatureDto,
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
