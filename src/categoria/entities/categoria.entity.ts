import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: 'tb_categorias' })    // indica que esta classe é uma tabela no banco com o nome 'tb_categorias'
export class Categoria {

    @PrimaryGeneratedColumn()   // cria a coluna 'id' com autoincremento
    id: number;

    @Column({ length: 100 })      // cria a coluna 'descricao' com tamanho máximo de 100 caracteres
    descricao: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];
}
