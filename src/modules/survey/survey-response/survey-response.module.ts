import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './survey-response.entity';
import { SurveyResponseController } from './survey-response.controller';
import { SurveyResponseService } from './survey-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse])],
  controllers: [SurveyResponseController],
  providers: [SurveyResponseService],
  exports: [SurveyResponseService],
})
export class SurveyResponseModule {}
