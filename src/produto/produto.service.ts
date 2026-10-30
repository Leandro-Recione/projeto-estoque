import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity.js';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto-dto.js';
import { UpdateProdutoDto } from './dto/update-produto-dto.js';
import { Fornecedor } from '../fornecedor/entity/fornecedor.entity.js';

@Injectable()
export class ProdutoService {
     constructor( @InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>, 
                  @InjectRepository(Fornecedor) private readonly fornecedorRepository: Repository<Fornecedor>) {}

  findAll() {
  return this.produtoRepository.find({
    relations: {
      fornecedor: true,
    },
  });
}

   findOne(id: number) {
    return this.produtoRepository.findOneBy({ id });
  }

       async create(dto: CreateProdutoDto) {
    const fornecedor = await this.fornecedorRepository.findOneBy({
      id: dto.fornecedorId,
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const produto = this.produtoRepository.create({
      nome: dto.nome,
      categoria: dto.categoria,
      quantidade: dto.quantidade,
      dataEntrada: dto.dataEntrada,
      vencimento: dto.vencimento,
      fornecedor,
    });

    return this.produtoRepository.save(produto);
  }

   async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.produtoRepository.update(id, updateProdutoDto);

    return this.findOne(id);
  }

  async delete(id: number) {
    const resultado = await this.produtoRepository.delete(id);

    return resultado.affected;
  }
}
