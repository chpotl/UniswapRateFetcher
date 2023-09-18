import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  const config = new DocumentBuilder()
    .setTitle('Uniswap Rate Fetcher')
    .setDescription('Api for Uniswap Rate Fetcher')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port, () => {
    console.log('Server started on port = ' + port);
  });
}
bootstrap();
