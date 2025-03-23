import { Module } from '@nestjs/common';
import { GisFieldService } from './gis-field.service';
import { GisLayerModule } from '../gis-layer/gis-layer.module';
import { GisFieldTypeModule } from '../gis-field-type/gis-field-type.module';
import { GisField } from './gis-field.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisFieldController } from './gis-field.controller';

@Module({
  providers: [GisFieldService],
  exports: [GisFieldService],
  imports: [
    TypeOrmModule.forFeature([GisField]),
    GisLayerModule,
    GisFieldTypeModule,
  ],
  controllers: [GisFieldController],
})
export class GisFieldModule {}
