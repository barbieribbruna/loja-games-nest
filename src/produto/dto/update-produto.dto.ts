import { PartialType } from '@nestjs/mapped-types';     // transforma todas as propriedades do DTO base em opcionais
import { CreateProdutoDto } from './create-produto.dto';    // importa o DTO usado na criação

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {}      // cria um DTO de atualização onde todos os campos do CreateProdutoDto se tornam opcionais


