# Desafio Back-end - CRUD de Usuários

## Descrição

Este projeto consiste na construção de uma API de CRUD de usuários utilizando **Node.js** e a biblioteca **Express**. O objetivo principal é gerenciar informações de usuários com as funcionalidades de **cadastrar**, **listar**, **atualizar**, **excluir** e **validar** dados. A aplicação também foi construída com **React** no front-end para fornecer uma interface de usuário.

## Funcionalidades

### Back-end (API)
- **Cadastrar um novo usuário**: Endpoint para criar um novo usuário com informações básicas, como nome, e-mail e data de nascimento.
- **Listar todos os usuários**: Endpoint que lista todos os usuários, com a possibilidade de adicionar filtros de pesquisa e ordenação (exemplo: listar usuários cujo nome inicie com "A", ordenados por idade).
- **Listar um usuário**: Endpoint para listar as informações detalhadas de um usuário específico.
- **Excluir um usuário**: Endpoint para excluir um usuário pelo seu ID.
- **Atualizar dados de um usuário**: Endpoint para editar as informações de um usuário.
- **Validação de dados**: Garantir que os dados enviados para os endpoints sejam válidos e que o usuário exista antes de realizar qualquer operação.

### Front-end
- Interface de usuário em **React** utilizando **Tailwind CSS** para o design.
- Funcionalidades para interagir com a API do back-end.
- Realização de operações CRUD (Criar, Ler, Atualizar, Excluir) diretamente pela interface de usuário.

## Tecnologias Utilizadas

### Back-end
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **Express**: Framework web para criação de APIs.
- **Mongoose**: Biblioteca para modelar e interagir com o MongoDB.
- **MongoDB**: Banco de dados NoSQL para persistência de dados.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **CORS**: Middleware para permitir requisições entre diferentes origens.

### Front-end
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para design rápido e customizável.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Vite**: Ferramenta para desenvolvimento de front-end rápido.
- **React-Toastify**: Biblioteca para exibição de mensagens de notificação (toast).
- **Lucide-react**: Conjunto de ícones de alta qualidade.

## Instalação

### Back-end

1. Navegue até a pasta `api`.
2. Execute o comando para instalar as dependências:

```bash
npm install
```

3. Após a instalação, inicie o servidor:

```bash
npm start
```

A API estará disponível em http://localhost:3001/.

### Front-end

1. Navegue até a pasta frontend.
2. Execute o comando para instalar as dependências

```bash
npm install
```
3. Após a instalação, inicie o servidor de desenvolvimento:

```bash
npm run dev
```
A interface do front-end estará disponível em http://localhost:5173/.

Estrutura do Projeto

- **/api**: Contém o back-end da aplicação, com as rotas da API, modelos de dados e lógica de negócio.
- **/frontend**: Contém o front-end da aplicação, com componentes React, páginas e estilos.

### Endpoints da API

1. **POST /users** - Criar um novo usuário
Body:

```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "birth": "1990-01-01"
}
```
2. **GET /users** - Listar todos os usuários

```json
[
  {
    "id": "1",
    "name": "Ana",
    "email": "ana@exemplo.com",
    "birth": "1990-01-01"
  },
  ...
]
```

3. **GET /users/:id** - Listar um usuário específico

. Parâmetros: id do usuário.
. Resposta:

```json
  {
  "id": "1",
  "name": "Ana",
  "email": "ana@exemplo.com",
  "birth": "1990-01-01"
}
```
### Considerações Finais
. A validação de segurança está implementada para verificar se o e-mail do usuário já está registrado antes de criar um novo.
. A API utiliza o MongoDB para persistir os dados dos usuários.
. O sistema de front-end foi feito para ser simples e fácil de usar, utilizando React com Tailwind CSS para um design responsivo.