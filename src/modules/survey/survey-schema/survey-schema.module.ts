import { Module } from '@nestjs/common';
import { SurveySchemaService } from './survey-schema.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveySchema } from './survey-schema.entity';

@Module({
  providers: [SurveySchemaService],
  imports: [TypeOrmModule.forFeature([SurveySchema])],
})
export class SurveySchemaModule {}
