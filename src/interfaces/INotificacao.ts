export enum TipoNotificacao {
  SUCESSO = "success",
  FALHA = "danger",
  ATENCAO = "warning",
}

export interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;
  id: number;
}
