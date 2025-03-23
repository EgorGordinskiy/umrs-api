import { Module } from '@nestjs/common';
import { GisLayerModule } from './gis-layer/gis-layer.module';
import { GisFeatureModule } from './gis-feature/gis-feature.module';
import { GisFieldModule } from './gis-field/gis-field.module';
import { GisFieldTypeModule } from './gis-field-type/gis-field-type.module';

@Module({
  imports: [
    GisLayerModule,
    GisFeatureModule,
    GisFieldModule,
    GisFieldTypeModule,
  ],
})
export class GisModule {}
