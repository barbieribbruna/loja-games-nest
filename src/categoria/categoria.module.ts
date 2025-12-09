import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';

@Module({       // é um decorator do NestJS que define um módulo e ele organiza e agrupa partes da aplicação (controllers, services e imports)
    imports: [TypeOrmModule.forFeature([Categoria])],   // registra a entidade Categoria para uso do repositório no service
    controllers: [CategoriaController],     // registra o controller responsável pelas rotas de Categoria
    providers: [CategoriaService],  // registra o service que contém a lógica de negócio
    exports: [TypeOrmModule]    // permite que outros módulos usem o repositório desta entidade
})
export class CategoriaModule {}     // módulo que reúne controller, service e entidade de Categoria
