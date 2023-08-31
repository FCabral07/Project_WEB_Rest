'use strict'

// Importações
const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../authMiddleware')

const productRouter = express.Router()

// Rotas simples, sem parametros
productRouter.route('/api/product')
.get(authMiddleware, (req, res) => productController.getProducts(req, res))
.post(authMiddleware, (req, res) => productController.createProduct(req, res))
.put(authMiddleware, (req, res) => productController.updateProduct(req, res))

// Rotas que precisam dos parametros
productRouter.route('/api/product/:id')
.get(authMiddleware, (req, res) => productController.getProduct(req, res))
.delete(authMiddleware, (req, res) => productController.deleteProduct(req, res))

module.exports = productRouter