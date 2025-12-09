import { IsNotEmpty, IsString } from 'class-validator';     // validadores para garantir que o campo seja string e não vazio

export class CreateCategoriaDto {   // é uma classe que define quais dados devem ser enviados no POST /categorias, e como esses dados devem ser validados
  @IsString()   // garante que o valor recebido seja uma string
  @IsNotEmpty()     // impede que o campo seja vazio
  descricao: string;    // campo obrigatório para criar uma categoria
}