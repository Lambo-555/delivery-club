import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v0.1/');
  const config = new DocumentBuilder()
    .setTitle('Scraper docs')
    .setDescription('The scraper API designed for get reviews from delivery-club')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  logger.log(`Scraper-server start on port: ${app.getUrl()}`);
  // TODO add docker, start scripts
}
bootstrap();
