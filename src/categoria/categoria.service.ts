import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()       // diz ao NestJS que essa classe pode ser injetada via DI (Dependency Injection)
export class CategoriaService {     // define a classe de serviço que contém a lógica de negócio
    
    constructor(
        @InjectRepository(Categoria)    // injeta o repositório da entidade 'Categoria', permitindo buscar, salvar, atualizar e remover do banco
        private categoriaRepository: Repository<Categoria>,
    ) { }

    /* FUNÇÃO ASYNC:
        - funções asyync sempre retornam uma Promise e qualquer valor que der return é automaticamente embrulhado dentro de uma Promise
        - então, em alguns casos, mesmo sem usar 'await', o resultado já será retornado como uma Promise para quem chamou o método
        - usa 'await' quando precisa do valor resolvido para tomar uma decisão no código (ex: if, validação, comparação, cálculo etc)
    */

    // CREATE

    async create(dto: CreateCategoriaDto): Promise<Categoria> {     // método CREATE (criar) 
        const categoria = this.categoriaRepository.create(dto);     // cria o objeto 'Categoria' com base no DTO (ainda não salva)
        return this.categoriaRepository.save(categoria);    // salva no banco e retorna a categoria salva
    }

    // READ (busca por todos)

    async findAll(): Promise<Categoria[]> {     // método FIND ALL (retorna uma lista com todas as categorias)
        return this.categoriaRepository.find()  // retorna todos os registros da tabela 'tb_categorias'
    }

    // READ (busca única por ID)

    async findOne(id: number): Promise<Categoria> {     // método FIND ONE POR ID

        /*
            - aqui nesse caso o 'await' pausa a execução até que o banco responda
            - quando a resposta chega, o valor ('Categoria' ou null) é armazenado na const 'categoria'
            - depois disso, o 'if' verifica se a categoria existe ou não, usando o valor armazenado em 'categoria'
        */

        const categoria = await this.categoriaRepository.findOne({
             where: {id}    // busca uma categoria pelo 'id'
        });
           

        if (!categoria) {       // se não existir
            throw new NotFoundException('Categoria não encontrada');    // é reportado erro 404
        }

        return categoria;   // se existir, retorna a categoria
    }

    // READ (busca por descrição)

    async findByDescricao(descricao: string): Promise<Categoria[]> {    // método FIND BY DESCRIÇÃO: busca categorias pela descrição
        
        return this.categoriaRepository.find({      // faz buscas por nome usando LIKE no SQL (busca por filtros) e retorna as categorias em lista

            where: {
                descricao: ILike(`%${descricao}%`) }    // ILike ignora maiúsculas/minúsculas e o que tem entre %...% significa buscar o texto em qualquer posição
        });
    }

    // UPDATE (atualiza)

    async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {     // método UPDATE (atualizar) | recebe o 'id' da categoria e os dados atualizados (DTO), processa a atualização e retorna uma Promise contendo a categoria atualizada
        
                                // findOne já informa erro internamente se a categoria/id não for encontrada e, se existir, retorna a categoria
        const categoria = await this.findOne(id);   // 'await' faz o código esperar a consulta do banco e, quando a Promise é resolvida, o valor retornado ('Categoria' ou erro) é armazenado na const 'categoria'

        Object.assign(categoria, dto);  // copia para o objeto 'categoria' somente os campos enviados no 'dto', subtituindo os valores antigos pelos novos, ou seja, apenas os campos presentes no DTO são atualizados
        return this.categoriaRepository.save(categoria);    // salva no banco a categoria atualizada e retorna o objeto já atualizado e o TypeORM decide se deve criar ou atualizar com base no 'id'
    }

    // DELETE (deleta)

    async delete(id: number): Promise<void> {   // método DELETE (excluir), que recebe um 'id' e não retorna nada (void)

                /* 'void' x 'DeleteResult':
                            - DeleteResult é o retorno padrão do TypeORM para o método .delete(), contendo informações como 'affected'
                            - void é usado aqui porque não precisamos dessas informações, apenas garantimos que a 'categoria' existe antes e então executamos a exclusão
                            - .delete(id) ou .delete(categoria) retornam DeleteResult, mas quero o 'void' porque não quero usar ou retornar DeleteResult, ou seja, as informações retornadas por ele (como números afetados)
                */

        await this.findOne(id);   // busca a categoria pelo 'id' e, se ele não existir, 'findOne' lança o erro 404
        await this.categoriaRepository.delete(id);   // 'await' espera o retorno e remove a categoria do banco, usando o objeto encontrado
    }
}

