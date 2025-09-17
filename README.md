# ws-alura-tracker

Projeto desenvolvido durante as aulas da Alura para aprendizado de Vue.js 3. O sistema tem como objetivo permitir o cadastro de projetos e tarefas dentro desses projetos, sendo ideal para fins educacionais e para quem deseja aprender sobre Vue.js 3 na prática.

## Funcionalidades

- Cadastro de projetos.
- Listagem e edição de projetos.
- Cadastro de tarefas atreladas a projetos.
- Listagem e edição de tarefas.
- Timer para controle do tempo gasto em tarefas.
- Interface amigável e responsiva.
- Boas práticas de organização e componentização em Vue.js 3.

## Estrutura do Projeto

O projeto segue a estrutura padrão de aplicações Vue.js 3 criadas via Vue CLI. Algumas pastas e arquivos importantes:

- `/src`: Código-fonte principal do frontend.
    - `/components`: Componentes Vue reutilizáveis.
    - `/views`: Telas principais do sistema.
    - `/router`: Configuração das rotas.
    - `/store`: Gerenciamento de estado (Vuex/Pinia, se utilizado).
- `package.json`: Dependências e comandos de execução.
- `public/`: Arquivos públicos e estáticos.
- `README.md`: Documentação do projeto.

## Principais Comandos

### Instalação das dependências
```bash
npm install
```

### Execução em modo desenvolvimento (hot-reload)
```bash
npm run serve
```

### Build para produção
```bash
npm run build
```

### Lint e correção automática de arquivos
```bash
npm run lint
```

## Customização de Configurações

Veja as referências da [Documentação Vue CLI](https://cli.vuejs.org/config/) para customizar as configurações do projeto.

## Mensagens de Commit e Evolução

O desenvolvimento seguiu boas práticas de versionamento, com commits frequentes indicando:

- Criação e ajuste de componentes para projetos e tarefas.
- Implementação de timer e funcionalidades de tempo.
- Melhorias de layout, estilos e responsividade.
- Ajustes em rotas e gerenciamento global de estado.
- Correções de bugs e refino da experiência de usuário.

## Tecnologias Utilizadas

- **Vue.js 3** — Framework principal.
- **Vue CLI** — Criação e gerenciamento do projeto.
- **JavaScript/TypeScript** — Lógica de programação.
- **HTML5/CSS3** — Estrutura e estilos da interface.
- (Outras dependências podem ser consultadas em `package.json`.)

## Como contribuir

1. Faça um fork do projeto.
2. Crie um branch para suas alterações: `git checkout -b minha-feature`.
3. Commit suas alterações: `git commit -m 'Adiciona nova feature'`.
4. Faça o push para o branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto é de caráter educacional.

---
Projeto feito para fins de aprendizado durante as aulas da Alura.
