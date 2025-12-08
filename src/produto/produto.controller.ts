import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";

@Controller('produtos')     // define que esse controller atende rotas iniciadas com 'produtos'
export class ProdutoController {    // controller responsável pelo recurso 'Produto'
    constructor(private readonly produtoService: ProdutoService) { }     // injeta o ProdutoService para que o controller possa chamar a lógica de negócio

    /*
        - o uso de 'Promise<>' é opcional nos métodos e sem tipar o retorno com ele é a forma mais usada hoje no NestJS
        - em 'return' já há retorno Promise internamente
    */

    // endpoint POST (create) /produtos

    @Post()     // cria um novo produto com os dados enviados no corpo (body) da requisição
    create(@Body() dto: CreateProdutoDto) {     // dto = dados do novo produto vindos no JSON da requisição
        return this.produtoService.create(dto);     // chama o service para salvar o produto no banco
    }

    // endpoint GET (read) /produtos

    @Get()      // retorna uma lista de produtos
    findAll() {     // lista todos os produtos cadastrados
        return this.produtoService.findAll();   // chama o service para buscar todos os registros no banco
    }

    // endpoint GET (read) /produtos/:id

    @Get(':id')     // busca um produto específico pelo 'id' informado na URL
    findOne(@Param('id', ParseIntPipe) id: number) {    // 'findOne': busca um único produto pelo ID informado na URL
        // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida
        return this.produtoService.findOne(id);     // retorna com o 'id' encontrado e, caso não existe, retorna com erro 404
    }

    // endpoint GET /produtos/nome/:nome

    @Get('nome/:nome')      // busca produtos pelo nome, referente ao ILike de 'produto.service' (pesquisa parcial, ignorando maiúsculas/minúsculas)
    findByNome(@Param('nome') nome: string) {       // busca pelo nome e recupera 'nome' passado na URL como texto
        return this.produtoService.findByNome(nome);    // chama o service, que faz a busca usando ILike (contém, ignorando maiúscula e minúscula)
    }

    // PUT /produtos/id

    @Put(':id')     // atualiza o produto com o ID informado, usando os dados enviados no corpo da requisição
    update(
        @Param('id', ParseIntPipe) id: number,      // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida
        @Body() dto: UpdateProdutoDto       // dto = dados que podem ser atualizados(parciais ou completos)
    ) {
        return this.produtoService.update(id, dto);     // chama o service para aplicar as alterações e salvar no banco
    }

    // DELETE /produtos/:id

    @Delete(':id')      // deleta do banco o produto com o ID informado
    delete(@Param('id', ParseIntPipe) id: number) {     // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida
        return this.produtoService.delete(id);      // chama o service, que verifica se existe o id/produto informado e depois exclui o produto
    }
}