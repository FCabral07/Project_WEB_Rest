## Projeto WEB Rest - Unifacisa

- [About](#ancora1)
- [Technologies](#ancora2)
- [Routes](#ancora3)
- [Routes Code](#ancora4)

## 💭 About

<a id="#ancora1"></a>
This is a repository for publish our project, this repository contains a simple Rest project.

## 🧪 Technologies

<a id="#ancora2"></a>
This project was developed using the following technologies:

- [MongoDB](https://www.mongodb.com/pt-br)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io)

## 📊 Routes

<a id="#ancora3"></a>

## Autenticação

### Create

- **Descrição:** Não requer autenticação.
- **Rota:** `POST /create`
- **Endpoint:** `localhost:port/create`

### Login

- **Descrição:** Autentica com base no usuário (com base na presença de um salário nos dados), passando password e username via POST.
- **Rota:** `POST /login`
- **Endpoint:** `localhost:port/login`

## User

Todas as rotas `/user` requerem autenticação de login e função (sendo funcionário), para evitar acesso e alteração não autorizados dos dados dos usuários no banco de dados.

- **Descrição:** Possui as seguintes operações: GET, POST, PUT e DELETE.
- **Rota:** `localhost:port/user`

## Product

Todas as rotas estão protegidas por autenticação, mas algumas requerem função (role) específica para acesso:

### Protegida por Função e Login:

- **Rota:** `POST /product`
- **Endpoint:** `localhost:port/product`
- **Descrição:** Realiza a criação e atualização dos produtos.

### Protegidas apenas por Login:

- **Rota:** `GET /products`
- **Endpoint:** `localhost:port/products`
- **Descrição:** Lista todos os produtos disponíveis.

- **Rota:** `GET /products/id`
- **Endpoint:** `localhost:port/products/id`
- **Descrição:** Retorna um produto específico com base em seu nome.

## Pedido

Todas as rotas associadas a pedidos requerem autenticação, no entanto, existem diferentes níveis de proteção:

### Protegida por Função e Login:

- **Rota:** `DELETE /deletar`
- **Descrição:** Esta rota tem como única funcionalidade a exclusão de todos os pedidos no sistema. Portanto, é exigida a autenticação do usuário.

### Protegidas Apenas por Login:

- **Rota:** `POST /cart`
- **Descrição:** Esta rota permite a criação de um novo pedido no sistema. É necessário estar autenticado para acessá-la.

- **Rota:** `GET /pedidos`
- **Descrição:** Esta rota retorna uma lista de todos os pedidos registrados no sistema. Assim como a rota de criação de pedidos, também requer autenticação.

## Promoção

Todas as rotas associadas a promoções requerem autenticação, mas apresentam diferentes níveis de proteção:

### Protegida por Função e Login:

- **Rota:** `POST /promocao`
- **Descrição:** Esta rota tem como única funcionalidade aplicar uma promoção a um usuário com base em seu CPF (fornecido no cabeçalho da solicitação). A promoção só será aplicada se o usuário atender aos requisitos, ou seja, tiver comprado mais de 3 itens de um determinado tipo. Portanto, a autenticação do usuário e a verificação de função são necessárias para acessar esta rota.

### Protegidas Apenas por Login:

- **Rota:** `GET /promocoes`
- **Descrição:** Esta rota recebe o CPF do usuário no cabeçalho da solicitação e retorna uma lista de produtos em promoção, desde que o usuário tenha promoções ativas. Assim como as outras rotas relacionadas a promoções, a autenticação é obrigatória para acessá-la.

## 📝 Routes Code

<a id="#ancora4"></a>

- [User Route](/src/routers/userRouter.js)
- [Product Route](/src/routers/productRouter.js)
- [Promotion Route](/src/routers/promotionRouter.js)
- [Pedido Route](/src/routers/pedidoRoute.js)
