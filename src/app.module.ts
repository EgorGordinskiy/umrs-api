import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './modules/survey/survey.module';
import { GisModule } from './modules/gis/gis.module';
import { DEVELOPMENT } from './common/constants';
import { SurveySubscriber } from './modules/survey/survey.subscriber';
import { DevModule } from './modules/dev/dev.module';

const imports = [
  ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === DEVELOPMENT,
  }),
  GisModule,
  SurveyModule,
];

if (process.env.NODE_ENV === DEVELOPMENT) {
  imports.push(DevModule);
}

@Module({
  imports,
  providers: [SurveySubscriber],
})
export class AppModule {}
