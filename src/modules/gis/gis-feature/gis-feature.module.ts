import { Module } from '@nestjs/common';
import { GisFeatureService } from './gis-feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisFeature } from './gis-feature.entity';
import { GisLayerModule } from '../gis-layer/gis-layer.module';
import { GisFeatureController } from './gis-feature.controller';

@Module({
  providers: [GisFeatureService],
  imports: [TypeOrmModule.forFeature([GisFeature]), GisLayerModule],
  exports: [GisFeatureService],
  controllers: [GisFeatureController],
})
export class GisFeatureModule {}
