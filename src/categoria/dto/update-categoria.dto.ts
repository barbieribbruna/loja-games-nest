import { PartialType } from '@nestjs/mapped-types';     // transforma todas as propriedades do DTO base em opcionais
import { CreateCategoriaDto } from './create-categoria.dto';    // importa o DTO usado na criação

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}  // cria um DTO de atualização onde todos os campos do CreateCategoriaDto se tornam opcionais
