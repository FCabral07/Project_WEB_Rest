'use strict'

// Importações
const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../authMiddleware')
const roleMiddleware = require('../roleMiddleware')

const userRouter = express.Router()

// Rotas que precisam de autenticação
userRouter.use('/user', authMiddleware, roleMiddleware)

// Definindo as rotas simples, que não precisam de parametros
userRouter.route('/user')
.get((req, res) => userController.getUsers(req, res))
.put((req, res) => userController.updateUser(req, res))
// Tanto o getUser como o deleteUser eu preferi usar sem passar parametros como o CPF
// via URL, por questões de segurança, para isso se passa no body
.post((req, res) => userController.getUser(req, res))
.delete((req, res) => userController.deleteUser(req, res))

// Rota de login
userRouter.route('/login')
.post((req, res) => userController.login(req, res))

// Rota de criação de usuário
userRouter.route('/create')
.post((req, res) => userController.createUser(req, res))

module.exports = userRouter