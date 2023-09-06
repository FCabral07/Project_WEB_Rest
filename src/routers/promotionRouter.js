const express = require("express");
const promocaoController = require("../controllers/promocaoController");
const authMiddleware = require('../authMiddleware');
const roleMiddleware = require('../roleMiddleware');

const promocaoRouter = express.Router();

promocaoRouter.use('/promocao', authMiddleware, roleMiddleware)
promocaoRouter.use('/promocoes', authMiddleware)

// Rota para aplicar desconto
promocaoRouter
  .route("/promocao")
  .post((req, res) => promocaoController.aplicarDesconto(req, res));

// Rota para obter produtos com desconto
promocaoRouter
  .route("/promocoes")
  .get((req, res) => promocaoController.getProdutosComDesconto(req, res));

module.exports = promocaoRouter;