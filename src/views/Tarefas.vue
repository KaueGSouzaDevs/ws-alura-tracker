<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa" />
        <Box v-if="listaVazia">
            Você não está muito produtivo hoje!
        </Box>
    </div>

    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" id="descricaoDaTarefa" class="input" v-model="tarefaSelecionada.descricao" />
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </div>
            </footer>
        </div>
    </div>
</template>



<script lang="ts">
import { computed, defineComponent } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';


export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null 
        }
    },
    setup() {
        const store = useStore(key);

        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store
        };
    },
    computed: {
        listaVazia() : boolean {
            return this.tarefas.length === 0
        }
    },
    methods:{
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },

        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },

        fecharModal() {
            this.tarefaSelecionada = null
        },

        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())

        }
    }
    });
</script>
