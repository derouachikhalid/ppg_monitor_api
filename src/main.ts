import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule ,  { cors: { origin : ["http://192.168.1.8:3000","http://localhost:3000","http://192.168.1.63:8081"] ,credentials : true } });
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }))
  
  await app.listen(5000);
}
bootstrap();
