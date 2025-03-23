import { Module } from '@nestjs/common';
import { GisLayerService } from './gis-layer.service';
import { GisLayerController } from './gis-layer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisLayer } from './gis-layer.entity';

@Module({
  providers: [GisLayerService],
  exports: [GisLayerService],
  imports: [TypeOrmModule.forFeature([GisLayer])],
  controllers: [GisLayerController],
})
export class GisLayerModule {}
