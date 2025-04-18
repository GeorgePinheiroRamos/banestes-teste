export interface Cliente {
    id: string;
    cpfCnpj: string;
    rg?: string;
    dataNascimento: Date;
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: string;
    rendaAnual: number;
    patrimonio: number;
    estadoCivil: 'Solteiro' | 'Casado' | 'Viúvo' | 'Divorciado';
    codigoAgencia: number;
  }
  
  export interface Conta {
    id: string;
    cpfCnpjCliente: string;
    tipo: 'corrente' | 'poupanca';
    saldo: number;
    limiteCredito: number;
    creditoDisponivel: number;
  }
  
  export interface Agencia {
    id: string;
    codigo: number;
    nome: string;
    endereco: string;
  }
  