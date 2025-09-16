<template>
  <section>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
          <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto"/>
      </div>
      <div class="field">
        <button type="submit" class="button">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">

// Importações
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { key } from '@/store';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';



// Definição do componente
export default defineComponent({
  name: 'FormularioProjetosView',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {

    // Instancias utilizadas
    const router = useRouter();
    const store = useStore(key);
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    // Carregamento de dados caso seja edição
    if (props.id) {
      const projeto = store.state.projeto.projetos.find((projeto) => projeto.id === props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    /**
     * Métodos
     */

    // Lidar com o sucesso
    const lidarComOSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Sucesso!', 'O projeto foi salvo com sucesso!');
      router.push('/projetos');
    }

    // Salvar o projeto
    const salvarProjeto = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
          .then(() => lidarComOSucesso());
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComOSucesso());
      }
    }

    // Retorno do setup
    return {
      nomeDoProjeto,
      salvarProjeto
    };
  }
});
</script>
