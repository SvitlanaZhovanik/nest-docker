import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './filters/validation-error.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ValidationErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('RSS news api')
    .setDescription('The news API about cats')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const option: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
  };
  const document = SwaggerModule.createDocument(app, config, option);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(3333);
}
bootstrap();
