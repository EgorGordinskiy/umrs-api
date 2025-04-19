import { Module } from '@nestjs/common';
import { SurveySchemaService } from './survey-schema.service';
import { SurveySchemaController } from './survey-schema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveySchema } from './survey-schema.entity';

@Module({
  providers: [SurveySchemaService],
  controllers: [SurveySchemaController],

  imports: [TypeOrmModule.forFeature([SurveySchema])],
})
export class SurveySchemaModule {}
