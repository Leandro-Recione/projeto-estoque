import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entity/produto.entity.js';

@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @OneToMany(() => Produto, (produto) => produto.fornecedor)
  produtos: Produto[];
}