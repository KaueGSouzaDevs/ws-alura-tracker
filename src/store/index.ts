import http from "@/http";
import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { OBTER_PROJETOS } from "./tipo-acoes";
import {
  ADICIONAR_PROJETO,
  DEFINIR_PROJETOS,
  EDITAR_PROJETO,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
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

    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, 3000);
    },

    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
      console.log(state.projetos);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get("projetos")
        .then((response) => commit(DEFINIR_PROJETOS, response.data));
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
