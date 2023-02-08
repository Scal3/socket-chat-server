import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import configuration from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = configuration();
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: '*',
  });

  await app.listen(config.app.PORT);
  console.log(`Application is running on port: ${config.app.PORT}`);
}
bootstrap();
