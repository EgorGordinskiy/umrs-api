import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const defaultBackendHost = 'http://localhost';
  const defaultPrefix = 'api';
  const defaultFrontendHost = 'http://localhost';

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.BACKEND_PREFIX ?? defaultPrefix);

  app.enableCors({
    origin: process.env.APP_HOST ?? defaultFrontendHost,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // cookies, authorization headers
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('UMRS API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? defaultBackendHost);
}

bootstrap();
