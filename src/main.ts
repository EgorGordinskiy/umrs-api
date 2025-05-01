import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/usr/src/app/key.pem'),
    cert: fs.readFileSync('/usr/src/app/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger();
  const config = new DocumentBuilder()
    .setTitle('UMRS API')
    .setVersion('1.0')
    .build();

  logger.log('запущен в режиме ' + process.env.NODE_ENV);
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
