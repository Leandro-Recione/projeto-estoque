import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service.js';
import { ProdutoController } from './produto.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity.js';
import { Fornecedor } from '../fornecedor/entity/fornecedor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Fornecedor])],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
