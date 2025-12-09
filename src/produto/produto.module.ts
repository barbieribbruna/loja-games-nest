import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({       // é um decorator do NestJS que define um módulo e ele organiza e agrupa partes da aplicação (controllers, services e imports)
  imports: [TypeOrmModule.forFeature([Produto])],   // registra a entidade Produto para uso do repositório no service
  controllers: [ProdutoController],     // registra o controller responsável pelas rotas de Produto
  providers: [ProdutoService],  // registra o service que contém a lógica de negócio
  exports: [TypeOrmModule],     // permite que outros módulos usem o repositório desta entidade
})
export class ProdutoModule {}   // módulo que reúne controller, service e entidade de Produto

