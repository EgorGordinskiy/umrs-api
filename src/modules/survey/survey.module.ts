import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResponseModule } from './survey-response/survey-response.module';
import { SurveySchemaModule } from './survey-schema/survey-schema.module';

@Module({
  providers: [SurveyService],
  imports: [SurveyResponseModule, SurveySchemaModule],
})
export class SurveyModule {}
