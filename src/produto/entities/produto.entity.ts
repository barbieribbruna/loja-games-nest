import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";    // importa os 'decorators' e tipos que serão usados para definir a entidade
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: 'tb_produtos' })  // diz ao TypeORM que a classe 'Produto' representa uma tabela do banco e o nome da tabela é 'tb_produtos'
export class Produto {      // exporta a Classe Produto e cada objeto dessa classe representa um registro da tabela 'tb_produtos'

    @PrimaryGeneratedColumn()   // indica que o 'id', do tipo number, na classe Produto é a chave primária e o valor é gerado automaticamente pelo banco
    id: number

    @Column({ length: 100 })  // indica que 'nome', do tipo string, é uma coluna na tabela e no db tem um campo de texto com no máximo 100 caracteres
    nome: string

    @Column({ length: 255, nullable: true })  // indica que 'descricao', do tipo string, é uma coluna na tabela e no db tem um campo de texto com no máximo 255 caracteres | 'nullable' significa que o campo pode ser null
    descricao: string

    @Column('decimal', { precision: 10, scale: 2 })   // indica que 'preco', do tipo number, é uma coluna na tabela e no db tem um campo total com 10 dígitos e 2 casas decimais
    preco: number

    @Column({ length: 50, nullable: true })   // indica que a propriedade 'console', do tipo string, é uma coluna na tabela e no db tem um campo de texto com no máximo 50 caracteres
    console: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
        onDelete: 'CASCADE',
    })

    categoria: Categoria;
}