import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS globally
  app.enableCors()

  // Start the server on the specified port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
