const projeto = {
    id: 1,
    descricao: 'Estudar Vue'
}

const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor) {
        console.log(`Interceptando ${chave}`);
        return Reflect.get(objetoOriginal, chave, receptor);
    },

    set(objetoOriginal, chave, valor) {
        console.log(`Alterando ${chave} para ${valor}`);
        objetoOriginal[chave] = valor;
    }
})


proxy.descricao = 'Estudar Vue 3';

console.log(proxy.descricao)
