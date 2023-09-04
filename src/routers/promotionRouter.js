const express = require("express");
const promocaoController = require("../controllers/promotionController");
const authMiddleware = require('../authMiddleware');
const roleMiddleware = require('../roleMiddleware');

const promocaoRouter = express.Router();

promocaoRouter.use('/aplicarDesconto', authMiddleware, roleMiddleware)
promocaoRouter.use('/getProdutosComDesconto', authMiddleware)

// Rota para aplicar desconto
promocaoRouter
  .route("/aplicarDesconto")
  .post((req, res) => promocaoController.aplicarDesconto(req, res));

// Rota para obter produtos com desconto
promocaoRouter
  .route("/getProdutosComDesconto")
  .get((req, res) => promocaoController.getProdutosComDesconto(req, res));

module.exports = promocaoRouter;