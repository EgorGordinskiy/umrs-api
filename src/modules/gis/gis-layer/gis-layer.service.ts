import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGisLayerDto } from './dto/create-gis-layer.dto';
import { GisLayer } from './gis-layer.entity';
import { BaseServiceImpl } from 'src/common/abstract';
import { UpdateGisLayerDto } from './dto/update-gis-layer.dto';

@Injectable()
export class GisLayerService extends BaseServiceImpl<
  GisLayer,
  CreateGisLayerDto,
  UpdateGisLayerDto
> {
  constructor(
    @InjectRepository(GisLayer)
    repository: Repository<GisLayer>,
  ) {
    super(repository);
  }
}
