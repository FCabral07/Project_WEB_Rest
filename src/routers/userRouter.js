'use strict'

// Importações
const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../authMiddleware')

const userRouter = express.Router()

// Definindo as rotas simples, que não precisam de parametros
userRouter.route('/api/user')
.get(authMiddleware, (req, res) => userController.getUsers(req, res))
.post((req, res) => userController.createUser(req, res))
.put(authMiddleware ,(req, res) => userController.updateUser(req, res))

// Rotas que precisam dos parametros
userRouter.route('/api/user/:id')
.get(authMiddleware, (req, res) => userController.getUser(req, res))
.delete(authMiddleware ,(req, res) => userController.deleteUser(req, res))

// Rota de login
userRouter.route('/login')
.post((req, res) => userController.login(req, res))

module.exports = userRouter