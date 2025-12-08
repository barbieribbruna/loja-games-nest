import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [

        ConfigModule.forRoot({  // habilita uso de variáveis de ambiente (.env)
            isGlobal: true,     // permite acessar process.env em qualquer arquivo do projeto
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',      // define que o banco de dados usado será o MySQL
            host: process.env.DB_HOST,      // endereço do servidor do banco (localhost)
            port: Number(process.env.DB_PORT),      // porta onde o MySQL está rodando
            username: process.env.DB_USERNAME,      // usuário do MySQL
            password: process.env.DB_PASSWORD,      // senha do usuário do MySQL, retirada do .env para não aparecer no GitHub
            database: process.env.DB_NAME,      // nome do banco de dados que a aplicação vai usar
            autoLoadEntities: true,     // carrega automaticamente todas as entidades do projeto, sem precisar registrar cada entidade manualmente
            synchronize: true,      // faz o TypeORM criar e atualizar as tabelas conforme as entidades
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
