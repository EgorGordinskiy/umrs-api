import { Module } from '@nestjs/common';
import { GisFieldTypeService } from './gis-field-type.service';
import { GisFieldType } from './field-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GisFieldTypeController } from './gis-field-type.controller';

@Module({
  providers: [GisFieldTypeService],
  imports: [TypeOrmModule.forFeature([GisFieldType])],
  exports: [GisFieldTypeService],
  controllers: [GisFieldTypeController],
})
export class GisFieldTypeModule {}
