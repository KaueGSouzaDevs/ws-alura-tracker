<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaVazia">
            Você não está muito produtivo hoje!
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro"/>
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa" />
    </div>

    <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
        <template v-slot:cabecalho>
            <p class="modal-card-title">Editar tarefa</p>
            <button class="delete" aria-label="close" @click="fecharModal"></button>
        </template>
        <template v-slot:corpo>
            <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Descrição
                </label>
                <input type="text" id="descricaoDaTarefa" class="input" v-model="tarefaSelecionada.descricao" />
            </div>
        </template>
        <template v-slot:rodape>
            <div class="buttons">
                <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </div>
        </template>
    </Modal>
</template>



<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import Modal from '@/components/Modal.vue';


export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null 
        }
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
    },
    setup() {
        const store = useStore(key);
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);
        const filtro = ref("");
        // const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)));

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        };
    }
});
</script>

<style scoped>
    .lista {
        padding: 1.25rem;
    }
</style>
