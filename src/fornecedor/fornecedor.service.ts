import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fornecedor } from './entity/fornecedor.entity.js';
import { CreateFornecedorDto } from './dto/create-fornecedor-dto.js';
import { UpdateFornecedorDto } from './dto/update-fornecedor-dto.js';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
  ) {}

  findAll() {
    return this.fornecedorRepository.find();
  }

  async findOne(id: number) {
    const fornecedor = await this.fornecedorRepository.findOneBy({ id });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
    }

    return fornecedor;
  }

  async create(dto: CreateFornecedorDto) {
    const fornecedor = this.fornecedorRepository.create(dto);

    return await this.fornecedorRepository.save(fornecedor);
  }

  async update(id: number, dto: UpdateFornecedorDto) {
    await this.findOne(id);

    await this.fornecedorRepository.update(id, dto);

    return this.findOne(id);
  }

  async delete(id: number) {
    await this.findOne(id);

    await this.fornecedorRepository.delete(id);

    return { mensagem: 'Fornecedor excluído com sucesso.' };
  }
}