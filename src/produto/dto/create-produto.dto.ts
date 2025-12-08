import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";   // importa validadores da biblioteca 'class-validator' e servem para validar dados recebidos no corpo da requisição (DTO)

export class CreateProdutoDto {     // declara e exporta a classe DTO usada para criar um produto
            // DTO (Data Transfer Object): o que o cliente deve enviar na requisição POST

    @IsString()     // valida que o valor enviado deve ser uma string
    @IsNotEmpty()   // indica que o campo é obrigatório e não pode ser vazio
    nome: string    // define a propriedade 'nome' do tipo string

    @IsString()     // valida que o valor enviado deve ser uma string
    @IsOptional()   // indica que o campo é opcional e pode ser vazio
    descricao?: string      // 'descricao' pode ser enviada ou não, mas, se enviada, tem que ser do tipo string (texto)

    @IsNumber()     // valida que o valor enviado deve ser numérico
    preco: number   // define a propriedade 'preco' do tipo number

    @IsString()     // valida que o valor enviado deve ser uma string
    @IsOptional()   // indica que o campo é opcional e pode ser vazio
    console?: string    // 'console' pode ser enviado ou não, mas, se enviado, tem que ser do tipo string (texto)
}
