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
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { key } from '@/store';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'FormularioProjetosView',
  props: {
    id: {
      type: String
    }
  },
  methods: {
    salvarProjeto() {

      if (this.id) {
        this.store.dispatch(ALTERAR_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
          .then(() => this.lidarComOSucesso());
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComOSucesso());
      }

    },

    lidarComOSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso!', 'O projeto foi salvo com sucesso!');
      this.$router.push('/projetos');
    }
  },
  setup(props) {

    const store = useStore(key);
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find((projeto) => projeto.id === props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    return {
      store,
      notificar,
      nomeDoProjeto
    };
  }
});
</script>
