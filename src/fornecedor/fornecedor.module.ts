import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service.js';
import { FornecedorController } from './fornecedor.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedor } from './entity/fornecedor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Fornecedor])],
  providers: [FornecedorService],
  controllers: [FornecedorController]
})
export class FornecedorModule {}
