import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './survey-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse])],
})
export class SurveyResponseModule {}
