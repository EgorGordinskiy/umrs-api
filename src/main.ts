import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DebugExceptionsFilter } from './common/debug-exceptions.filter';
import { DEVELOPMENT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === DEVELOPMENT) {
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new DebugExceptionsFilter(httpAdapter));
  }

  const config = new DocumentBuilder()
    .setTitle('UMRS API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
