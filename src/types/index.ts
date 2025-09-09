export interface Cartaz {
  urlCartaz: string;
  tipoCartaz: string;
}

export interface OcorrenciaEntrevista {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean | null;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevista | null;
  listaCartaz: Cartaz[];
  ocoId: number;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export interface ApiResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: Pessoa[];
}
