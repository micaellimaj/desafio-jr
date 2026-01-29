import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desafio Junior API')
    .setDescription('Documentação da API de Pets e Usuários')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Applicação está rodando em: http://localhost:3000`);
  console.log(`📒 Documentação swagger está rodando em: http://localhost:3000/api-docs`);
}
bootstrap();