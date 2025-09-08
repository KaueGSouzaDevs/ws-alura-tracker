<template>
  <div class="projetos">
    <div class="title">Projetos</div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ProjetosView',
  });
</script>

<style scoped>
.projetos {
  padding: 1.5rem;
}
</style>

