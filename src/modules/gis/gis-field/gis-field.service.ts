import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGisFieldDto } from './dto/create-gis-field.dto';
import { UpdateGisFieldDto } from './dto/update-gis-field.dto';
import { GisField } from './gis-field.entity';
import { BaseServiceImpl } from 'src/common/abstract';
import { GisLayerService } from '../gis-layer/gis-layer.service';
import { GisFieldTypeService } from '../gis-field-type/gis-field-type.service';

@Injectable()
export class GisFieldService extends BaseServiceImpl<
  GisField,
  CreateGisFieldDto,
  UpdateGisFieldDto
> {
  constructor(
    @InjectRepository(GisField)
    repository: Repository<GisField>,
    private readonly layerService: GisLayerService,
    private readonly gisFieldTypeService: GisFieldTypeService,
  ) {
    super(repository);
  }

  public async create(dto: CreateGisFieldDto): Promise<GisField> {
    const { name, typeId, layerId } = dto;

    const [layer, type] = await Promise.all([
      this.layerService.findOne(layerId),
      this.gisFieldTypeService.findOne(typeId),
    ]);

    const entity = this.repository.create({
      name,
      type,
      layer,
    });

    return await this.repository.save(entity);
  }

  public async update(id: number, dto: UpdateGisFieldDto): Promise<GisField> {
    const { name, typeId } = dto;

    const gisField = await this.findOne(id);

    if (name) {
      gisField.name = name;
    }

    if (typeId) {
      const type = await this.gisFieldTypeService.findOne(typeId);
      gisField.type = type;
    }

    return this.repository.save(gisField);
  }
}
