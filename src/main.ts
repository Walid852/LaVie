import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('La Vie')
    .setDescription('La Vie API description')
    .setVersion('1.0')
    .addTag('LaVie')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Api', app, document);
  await app.listen(3000);
  //dotenv.config();
  /**/
}
bootstrap();
