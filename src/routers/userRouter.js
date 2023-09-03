"use strict";

// Importações
const express = require("express");
const userController2 = require("../controllers/userController2");
//const authMiddleware = require('../authMiddleware')
//const roleMiddleware = require('../roleMiddleware')

const userRouter = express.Router();

// Rotas que precisam de autenticação
//userRouter.use("/user", authMiddleware, roleMiddleware);

// Definindo as rotas simples, que não precisam de parametros
userRouter
  .route("/user")
  .get((req, res) => userController2.getUsers(req, res))
  .put((req, res) => userController2.updateUser(req, res));

// Rotas que precisam dos parametros
userRouter
  .route("/user/:id")
  .get((req, res) => userController2.getUser(req, res))
  .delete((req, res) => userController2.deleteUser(req, res));

// Rota de login
userRouter.route("/login").post((req, res) => userController2.login(req, res));

// Rota de criação de usuário
userRouter
  .route("/create")
  .post((req, res) => userController2.createUser(req, res));

module.exports = userRouter;
