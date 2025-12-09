import { Injectable, NotFoundException } from '@nestjs/common';     // 'Injectable' permite que essa classe seja injetada em outros lugares e 'NotFoundException' lança erro 404 quando algo não é encontrado 
import { InjectRepository } from '@nestjs/typeorm';     // decorator para injetar repositórios do TypeORM
import { ILike, Repository } from 'typeorm';    // 'Repository' acessa o banco e 'ILike' é o operador de busca case-insensitive
import { Produto } from './entities/produto.entity';    // importa a entidade Produto
import { CreateProdutoDto } from './dto/create-produto.dto';    // importa o DTO usado no create
import { UpdateProdutoDto } from './dto/update-produto.dto';    // importa o DTO usado no update

@Injectable()   // diz ao NestJS que essa classe pode ser injetada via DI (Dependency Injection)
export class ProdutoService {   // define a classe de serviço que contém a lógica de negócio

    constructor(    // construtor
        @InjectRepository(Produto)  // injeta no serviço o repositório da entidade 'Produto', permitindo buscar, salvar, atualizar e remover do banco
        private produtoRepository: Repository<Produto>
    ) { }

    /* FUNÇÃO ASYNC:
        - funções asyync sempre retornam uma Promise e qualquer valor que der return é automaticamente embrulhado dentro de uma Promise
        - então, em alguns casos, mesmo sem usar 'await', o resultado já será retornado como uma Promise para quem chamou o método
        - usa 'await' quando precisa do valor resolvido para tomar uma decisão no código (ex: if, validação, comparação, cálculo etc)
    */

    async create(dto: CreateProdutoDto): Promise<Produto> {     // método CREATE (criar)    
        const produto = this.produtoRepository.create(dto);     // cria o objeto 'Produto' com base no DTO (ainda não salva)
        return this.produtoRepository.save(produto);    // salva no banco e retorna o produto salvo
    }

    async findAll(): Promise<Produto[]> {       // método FIND ALL (read/ler)
        return this.produtoRepository.find();   // retorna todos os registros da tabela 'tb_produtos'
    }

    async findOne(id: number): Promise<Produto> {       // método FIND ONE POR ID

        /*
            - aqui nesse caso o 'await' pausa a execução até que o banco responda
            - quando a resposta chega, o valor ('Produto' ou null) é armazenado na const 'produto'
            - depois disso, o 'if' verifica se o produto existe ou não (o 'if' aguarda o resultado armazenado em produto)
        */

        const produto = await this.produtoRepository.findOne({
            where: {id}       // busca um produto pelo 'id'
        });

        if (!produto) {     // se não existir
            throw new NotFoundException('Produto não encontrado')    // é reportado erro 404
        }
        return produto; // se existir, retorna o produto
    }

    async findByNome(nome: string): Promise<Produto[]> {    // método FIND BY NOME: busca produtos pelo nome

        return this.produtoRepository.find({    // faz buscas por nome usando LIKE no SQL (busca por filtros) e retorna todos os produtos em lista

            where: {
                nome: ILike(`%${nome}%`)
            },    // ILike ignora maiúsculas/minúsculas e o que tem entre %...% significa buscar o texto em qualquer posição
        });
    }

    async update(id: number, dto: UpdateProdutoDto): Promise<Produto> {     // método UPDATE (atualizar) | recebe o 'id' do produto e os dados atualizados (DTO), processa a atualização e retorna uma Promise contendo o produto atualizado

                    // findOne já informa erro internamente se o produto/id não for encontrado e, se existir, retorna o produto
        const produto = await this.findOne(id);     // 'await' faz o código esperar a consulta do banco e, quando a Promise é resolvida, o valor retornado ('Produto' ou erro) é armazenado na const 'produto'

        Object.assign(produto, dto);    // copia para o objeto 'produto' somente os campos enviados no 'dto', subtituindo os valores antigos pelos novos, ou seja, apenas os campos presentes no DTO são atualizados
        return this.produtoRepository.save(produto);    // salva no banco o produto atualizado e retorna o objeto já atualizado e o TypeORM decide se deve criar ou atualizar com base no 'id'
    }
                                
    async delete(id: number): Promise<void> {       // método DELETE (excluir), que recebe um 'id' e não retorna nada (void)

                            /* 'void' x 'DeleteResult':
                                    - DeleteResult é o retorno padrão do TypeORM para o método .delete(), contendo informações como 'affected'
                                    - void é usado aqui porque não precisamos dessas informações, apenas garantimos que o 'produto' existe antes e então executamos a exclusão
                                    - .delete(id) ou .delete(produto) retornam DeleteResult, mas quero o 'void' porque não quero usar ou retornar DeleteResult, ou seja, as informações retornadas por ele (como números afetados)
                            */

        const produto = await this.findOne(id);     // busca o produto pelo 'id' e, se ele não existir, 'findOne' lança o erro 404
        await this.produtoRepository.delete(produto);   // 'await' espera o retorno e remove o produto do banco, usando o objeto encontrado
    }
}
