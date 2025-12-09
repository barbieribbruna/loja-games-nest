import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')   // define que esse controller atende rotas iniciadas com 'categorias'
export class CategoriaController {      // controller responsável pelo recurso 'Categoria'

    constructor(private readonly categoriaService: CategoriaService) {}     // injeta a CategoriaService para que o controller possa chamar a lógica de negócio

        /*
            - o uso de 'Promise<>' é opcional nos métodos e sem tipar o retorno com ele é a forma mais usada hoje no NestJS
            - em 'return' já há retorno Promise internamente
        */

    // endpoint POST (create) /categorias

    @Post()     // cria uma nova categoria com os dados enviados no corpo (body) da requisição
    create(@Body() dto: CreateCategoriaDto) {       // dto = dados da nova categoria vindos no JSON da requisição

        return this.categoriaService.create(dto);   // chama o service para salvar o produto no banco
    }

    // endpoint GET (read) /categorias

    @Get()      // retorna uma lista de categorias
    findAll() {     // lista todas as categorias cadastradas

        return this.categoriaService.findAll();     // chama o service para buscar todos os registros no banco
    }

    // endpoint GET (read) /categorias/:id

    @Get(':id')     // busca uma categoria específica pelo ID informado na URL
    findOne(@Param('id', ParseIntPipe) id: number) {    // 'findOne': busca uma única categoria pelo ID informado na URL
        // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida

        return this.categoriaService.findOne(id);   // retorna com o 'id' encontrado e, caso não existe, retorna com erro 404
    }

    // endpoint GET (read) /categorias/descricao/:descricao

    @Get('descricao/:descricao')    // busca categorias pela descrição, referente ao ILike de 'categoria.service' (pesquisa parcial, ignorando maiúsculas/minúsculas)
    findByDescricao(@Param('descricao') descricao: string) {    // busca pelo nome e recupera 'descricao' passado na URL como texto

        return this.categoriaService.findByDescricao(descricao);    // chama o service, que faz a busca usando ILike (contém, ignorando maiúscula e minúscula)
    }

    // endpoint PUT (update) /categorias/:id

    @Put(':id')     // atualiza a categoria com o ID informado, usando os dados enviados no corpo da requisição
    update(
        @Param('id', ParseIntPipe) id: number,      // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida
        @Body() dto: UpdateCategoriaDto) {      // dto = dados que podem ser atualizados(parciais ou completos)

        return this.categoriaService.update(id, dto);      // chama o service para aplicar as alterações e salvar no banco
    }

    // endpoint DELETE (delete) /categorias/:id

    @Delete(':id')      // deleta do banco a categoria com o ID informado
    delete(@Param('id', ParseIntPipe) id: number) {     // 'Param' + 'ParseIntPipe': converte automaticamente o 'id' da URL (string) para number e valida
        
        return this.categoriaService.delete(id);    // chama o service, que verifica se existe a id/categoria informada e depois exclui a categoria
    }
}
