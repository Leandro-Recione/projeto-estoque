export class CreateProdutoDto {
  nome: string;
  categoria: string;
  quantidade: number;
  fornecedorId: number;
  dataEntrada: Date;
  vencimento: Date;
}