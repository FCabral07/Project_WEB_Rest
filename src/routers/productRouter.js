"use strict";

// Importações
const express = require("express");
const productController = require("../controllers/productController");
//const authMiddleware = require('../authMiddleware')
//const roleMiddleware = require('../roleMiddleware')

const productRouter = express.Router();

// Definindo as rotas que precisam dos tokens
//productRouter.use("/product");

productRouter
  .route("/product")
  .post((req, res) => productController.createProduct(req, res))
  .put((req, res) => productController.updateProduct(req, res));

// Rotas para deletar produtos
productRouter
  .route("/product/delete/:nome")
  .delete((req, res) => productController.deleteProduct(req, res));

// Recebendo a lista de produtos
productRouter
  .route("/products")
  .get((req, res) => productController.getProducts(req, res));

// Recebendo um produto especifico
productRouter
  .route("/products/:id")
  .get((req, res) => productController.getProduct(req, res));

module.exports = productRouter;
