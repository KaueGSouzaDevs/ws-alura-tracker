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
import { key, store } from '@/store';
import { ADICIONAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  name: 'FormularioProjetosView',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = store.state.projetos.find((projeto) => projeto.id === this.id);
      this.nomeDoProjeto = projeto?.nome || '';
      
    }
  },
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  methods: {
    salvarProjeto() {

      if (this.id) {
        store.commit(EDITAR_PROJETO, { id: this.id, nome: this.nomeDoProjeto });
      } else {
        store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso!', 'O projeto foi salvo com sucesso!');
      this.$router.push('/projetos');
    },
  },
  setup() {
    const store = useStore(key);
    const { notificar } = useNotificador();
    return {
      store,
      notificar
    };
  }
});
</script>
