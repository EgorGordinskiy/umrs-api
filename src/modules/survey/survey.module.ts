import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResponseModule } from './survey-response/survey-response.module';
import { SurveySchemaModule } from './survey-schema/survey-schema.module';
import { Survey } from './survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SurveyService],
  imports: [
    SurveyResponseModule,
    SurveySchemaModule,
    TypeOrmModule.forFeature([Survey]),
  ],
})
export class SurveyModule {}
