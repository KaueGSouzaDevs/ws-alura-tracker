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
import { key, store } from '@/store';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

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
        store.commit('EDITAR_PROJETO', { id: this.id, nome: this.nomeDoProjeto });
      } else {
        store.commit('ADICIONAR_PROJETO', this.nomeDoProjeto);
      }
      this.nomeDoProjeto = '';
      this.$router.push('/projetos');
    }
  },
  setup() {
    const store = useStore(key);
    return {
      store
    };
  }
});
</script>
