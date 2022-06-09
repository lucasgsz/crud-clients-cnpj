export interface Client {
  id: number;
  nome_fantasia: string;
  cnpj: number;
  ativo: boolean;
  email: string;
  observacao?: string;
  contribuinte: boolean;
  cep: number;
  tipo_logradouro: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  razao_social: string;
  nome_responsavel?: string;
  cpf_responsavel?: number;
  data_nascimento_responsavel?: string;
  telefone_responsavel?: number;
  celular_responsavel?: number;
  email_responsavel?: string;
  inscricao_municipal?: string;
  inscricao_estadual?: string;
}
