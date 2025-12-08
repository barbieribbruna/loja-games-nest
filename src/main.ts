import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {    // função principal que inicia a aplicação Nest

    const app = await NestFactory.create(AppModule);    // cria a aplicação baseada no AppModule, que é o módulo raiz do projeto

    process.env.TZ = '-03:00'   // define o fuso horário da aplicação, usado no Brasil

    app.useGlobalPipes(new ValidationPipe())    // ativa validação automática dos DTOs em todas as rotas

    app.enableCors();   // habilita CORS (mecanismo de segurança que controle quem pode acessar a API) para permitir requisições de outros domínios

    await app.listen(process.env.PORT ?? 3000); // inicia o servidor na porta definida ou padrão 3000
}
bootstrap();    // executa a função inicial
