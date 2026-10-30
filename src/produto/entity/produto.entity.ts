import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fornecedor } from '../../fornecedor/entity/fornecedor.entity.js';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  quantidade: number;

   @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.produtos, {
    nullable: false,
  })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Fornecedor;

  @Column({ type: 'date' })
  dataEntrada: Date;

  @Column({ type: 'date' })
  vencimento: Date;
}