import { Module } from '@nestjs/common';
import { SurveySchemaService } from './survey-schema.service';
import { SurveySchemaController } from './survey-schema.controller';

@Module({
  providers: [SurveySchemaService],
  controllers: [SurveySchemaController],
})
export class SurveySchemaModule {}
