import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONAR_PROJETO,
  EDITAR_PROJETO,
  EXCLUIR_PROJETO,
} from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: "Uma notificação de sucesso",
        titulo: "Sucesso",
        tipo: TipoNotificacao.SUCESSO,
      },
      {
        id: 2,
        texto: "Uma notificação de falha",
        titulo: "Falha",
        tipo: TipoNotificacao.FALHA,
      },
      {
        id: 3,
        texto: "Uma notificação de atenção",
        titulo: "Atenção",
        tipo: TipoNotificacao.ATENCAO,
      },
    ],
  },
  mutations: {
    [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },

    [EDITAR_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((p) => p.id === projeto.id);
      state.projetos[index] = projeto;
    },

    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((p) => p.id !== id);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
