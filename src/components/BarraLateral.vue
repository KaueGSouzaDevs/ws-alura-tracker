<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo do VueJS" />
    </h1>
    <button type="button" class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'BarraLateral',
    methods: {
      alterarTema() {
        this.modoEscuroAtivo = !this.modoEscuroAtivo
        this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
      },
    },
    emits: ['aoTemaAlterado'],
    data() {
      return {
        modoEscuroAtivo: false,
      };
    },
    computed: {
      textoBotao() {
        if (this.modoEscuroAtivo) {
          return 'Desativar modo escuro';
        }
        return 'Ativar modo escuro';
      }
    }
  });
</script>

<style scoped>
  header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
  }
  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
</style>
