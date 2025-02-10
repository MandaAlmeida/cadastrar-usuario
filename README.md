# Desafio Back-end - CRUD de Usuários

## Descrição

Este projeto consiste na construção de uma API de CRUD de usuários utilizando **Node.js** e a biblioteca **Express**. O objetivo principal é gerenciar informações de usuários com as funcionalidades de **cadastrar**, **listar**, **atualizar**, **excluir** e **filtrar**. A aplicação também foi construída com **React** no front-end para fornecer uma interface de usuário.

![Imagem do Projeto](./frontend/assets/printProject.png)

## Funcionalidades

### Back-end (API)
- **Cadastrar um novo usuário**: Endpoint para criar um novo usuário com informações básicas, como nome, e-mail e data de nascimento.
- **Listar todos os usuários**: Endpoint que lista todos os usuários, com a possibilidade de adicionar filtros de pesquisa e ordenação
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
- **bcrypt**: Biblioteca para criptografar senhas.
- **dotenv**: Gerenciador de variáveis de ambiente.
- **jsonwebtoken**: Biblioteca para geração e verificação de tokens JWT.

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

2. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
3. Acesse a pasta do projeto:
   ```bash
   cd cadastrar-usuario/api
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Crie um arquivo `.env` na raiz do projeto e defina sua chave secreta JWT:
   ```env
   MONGO_URI=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/seu_banco
   SECRET=seu_segredo_aqui
   ```
6. Inicie a aplicação:
   ```bash
   npm run dev
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

### 1. Criar um usuário
- **Rota:** `POST /register`
- **Descrição:** Registra um novo usuário.
- **Parâmetros:**
  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "birth": "YYYY-MM-DD",
    "password": "senha123",
    "confirmPassword": "senha123"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Usuário criado com sucesso"
  }
  ```

### 2. Autenticação (Login)
- **Rota:** `POST /login`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Parâmetros:**
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senha123"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Autenticação realizada com sucesso",
    "token": "token_jwt"
  }
  ```

### 3. Obter Usuário por ID rota privada

**Rota:** `GET /users/:id`

**Descrição:** Retorna um usuário específico com base no ID fornecido.

#### Exemplo de Requisição:

```http
GET http://localhost:3001/users/65a9cbd432f5bc1234567890
```

#### Exemplo de Resposta:

```json
{
    "user": {
        "_id": "65a9cbd432f5bc1234567890",
        "name": "João Silva",
        "email": "joao@email.com",
        "birth": "1990-06-15"
    }
}
```

**Possíveis Respostas:**

- `200 OK` - Usuário encontrado
- `404 Not Found` - Usuário não encontrado

---

### 4. Listar Todos os Usuários

**Rota:** `GET /users`

**Descrição:** Retorna a lista de todos os usuários cadastrados.

#### Exemplo de Requisição:

```http
GET http://localhost:3001/users
```

#### Exemplo de Resposta:

```json
[
    {
        "_id": "65a9cbd432f5bc1234567890",
        "name": "João Silva",
        "email": "joao@email.com",
        "birth": "1990-06-15"
    },
    {
        "_id": "65a9cbd432f5bc1234567891",
        "name": "Maria Oliveira",
        "email": "maria@email.com",
        "birth": "1995-08-20"
    }
]
```

**Possíveis Respostas:**

- `200 OK` - Lista de usuários retornada com sucesso
- `500 Internal Server Error` - Erro ao buscar usuários

---

### 5. Filtrar Usuários

**Rota:** `GET /users?name={name}&orderByName={true/false}&orderByAge={true/false}`

**Descrição:** Filtra usuários por nome e permite ordenação por nome e idade.

#### Exemplo de Requisição:

```http
GET http://localhost:3001/users?name=Maria&orderByName=true&orderByAge=true
```

#### Exemplo de Resposta:

```json
[
    {
        "_id": "65a9cbd432f5bc1234567891",
        "name": "Maria Oliveira",
        "email": "maria@email.com",
        "birth": "1995-08-20"
    }
]
```

**Possíveis Respostas:**

- `200 OK` - Usuários filtrados retornados com sucesso
- `500 Internal Server Error` - Erro ao processar a filtragem

---

### 6. Excluir Usuário

**Rota:** `DELETE /users/:id`

**Descrição:** Remove um usuário do banco de dados pelo seu ID.

#### Exemplo de Requisição:

```http
DELETE http://localhost:3001/users/65a9cbd432f5bc1234567890
```

#### Exemplo de Resposta:

```json
{
    "message": "Usuário deletado com sucesso"
}
```

**Possíveis Respostas:**

- `200 OK` - Usuário deletado com sucesso
- `404 Not Found` - Usuário não encontrado
- `500 Internal Server Error` - Erro ao excluir usuário

---

### Melhorias frontend
- Criar uma pagina de login no frontend
- Criar pagina separa para registro
- Fazer desig responsivo 
- Mudar rota de busca para a privada


### Considerações Finais
- A validação de segurança está implementada para verificar se o e-mail do usuário já está registrado antes de criar um novo usuário.
- A API utiliza o MongoDB para persistir os dados dos usuários.
- O sistema de front-end foi feito para ser simples e fácil de usar, utilizando React com Tailwind CSS.