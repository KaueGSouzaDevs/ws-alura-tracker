<template>
    <div class="notificacoes">
        <article class="message is-success">
            <div class="message-header">
                <p>Atenção</p>
            </div>
            <div class="message-body">
                Projeto criado com sucesso!
            </div>
        </article>
        <article class="message is-warning">
            <div class="message-header">
                <p>Atenção</p>
            </div>
            <div class="message-body">
                Projeto criado com sucesso!
            </div>
        </article>
        <article class="message is-danger">
            <div class="message-header">
                <p>Atenção</p>
            </div>
            <div class="message-body">
                Projeto criado com sucesso!
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'NotificacoesView'
    });
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>
