import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GisFeature } from './gis-feature.entity';
import { CreateGisFeatureDto } from './dto/create-gis-feature.dto';
import { UpdateGisFeatureDto } from './dto/update-gis-feature.dto';
import { BaseServiceImpl } from 'src/common/abstract';
import { GisLayerService } from '../gis-layer/gis-layer.service';

@Injectable()
export class GisFeatureService extends BaseServiceImpl<
  GisFeature,
  CreateGisFeatureDto,
  UpdateGisFeatureDto
> {
  constructor(
    @InjectRepository(GisFeature)
    repository: Repository<GisFeature>,
    private readonly layerService: GisLayerService,
  ) {
    super(repository);
  }

  public async create(dto: CreateGisFeatureDto): Promise<GisFeature> {
    const entity = await this.make(dto);

    return this.repository.save(entity);
  }

  public async createMany(dto: CreateGisFeatureDto[]): Promise<GisFeature[]> {
    const makefunc = this.make.bind(this);

    return super.createMany(dto, makefunc);
  }

  /**
   * Метод для конструирования сущности
   */
  private async make(dto: CreateGisFeatureDto) {
    const { geometry, properties, layerId } = dto;

    const layer = await this.layerService.findOne(layerId);

    if (layer.geometryType !== geometry.type) {
      throw new Error(
        `Тип ${geometry.type} не может быть в данном слое! В нем должен использоваться ${layer.geometryType}`,
      );
    }

    return this.repository.create({
      geometry,
      properties,
      layer,
    });
  }
}
