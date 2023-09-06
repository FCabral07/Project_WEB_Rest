## Projeto WEB Rest - Unifacisa
* [About](#ancora1)
* [Technologies](#ancora2)
* [Routes](#ancora3)
* [Routes Code](#ancora4)

## 💭 About
<a id="#ancora1"></a>
This is a repository for publish my project at the bootcamp of iFood - Data Science, this repository contains a simple BD project

## 🧪 Technologies
<a id="#ancora2"></a>
This project was developed using the following technologies:

- [MongoDB](https://www.mongodb.com/pt-br)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io)

## 📊 Routes
<a id="#ancora3"></a>

# Routes:
Autenticação:
    - create:
        - Não precisa de autenticação;
        - localhost:port/create;
    - login:
        - Autentica de acordo com o usuário (baseado se tem salário nos dados ou não), passando password e username via post;
        - localhost:port/login;
User:
    - Todas as rotas /user precisam de autenticação de login e sendo funcionário, pois não faria sentido o usuário comum conseguir acessar e alterar dados dos usuários presentes na DB;
    - localhost:port/user;
    - Tem todas as opções, get, post, put e delete;
Product:
    - Todas as rotas são protegidas por autenticação, mas uma é protegida por função (role) e outra é protegida apenas por login;
    - Protegida por função e login:
        - localhost:port/product;
        - Só tem apenas o post e put, que cria e atualiza os produtos;
    - Protegidos só por login:
        - localhost:port/products e localhost:port/products/id;
        - A primeira pega todos os produtos e lista, enquanto a segunda pega um produto específico pelo nome;


## 📝 Routes Code
<a id="#ancora4"></a>

- [User Route](/src/routers/userRouter.js)
- [Product Route](/src/routers/productRouter.js)
- [Promotion Route](/src/routers/promotionRouter.js)
- [Pedido Route](/src/routers/pedidoRoute.js)

