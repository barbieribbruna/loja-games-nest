import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
    imports: [

        ConfigModule.forRoot({  // habilita uso de variáveis de ambiente (.env)
            isGlobal: true,     // permite acessar process.env em qualquer arquivo do projeto
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',      // define que o banco de dados usado será o MySQL
            
            // essas informações abaixo, para preservar a password, foram inseridas como variáveis de ambiente do Windows e facilitam caso haja alteração futura de senha
            host: process.env.DB_HOST,                          // endereço do servidor do banco (localhost)
            port: Number(process.env.DB_PORT),                  // porta onde o MySQL está rodando
            username: process.env.DB_USER,                      // usuário do MySQL
            password: process.env.DB_PASSWORD,                  // senha do MySQL, ocultada com .env para não ficar exposta
            database: 'db_loja_games_nest',                     // nome do banco de dados deste projeto
            
            autoLoadEntities: true,     // carrega automaticamente todas as entidades do projeto, sem precisar registrar cada entidade manualmente
            synchronize: true,          // faz o TypeORM criar e atualizar as tabelas conforme as entidades
        }),

        ProdutoModule,
        CategoriaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
