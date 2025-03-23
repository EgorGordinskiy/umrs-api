import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GisFieldType } from './field-type.entity';
import { Repository } from 'typeorm';
import { CreateGisFieldTypeDto } from './dto/create-gis-field-type.dto';
import { UpdateGisFieldTypeDto } from './dto/update-gis-field-type.dto';
import { BaseServiceImpl } from 'src/common/abstract';

@Injectable()
export class GisFieldTypeService extends BaseServiceImpl<
  GisFieldType,
  CreateGisFieldTypeDto,
  UpdateGisFieldTypeDto
> {
  constructor(
    @InjectRepository(GisFieldType)
    repository: Repository<GisFieldType>,
  ) {
    super(repository);
  }
}
