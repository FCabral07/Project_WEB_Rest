const express = require("express");
const promocaoController = require("../controllers/promocaoController");
const authMiddleware = require('../authMiddleware');
const roleMiddleware = require('../roleMiddleware');

const promocaoRouter = express.Router();

promocaoRouter.use('/promocao', roleMiddleware)
promocaoRouter.use('/promocoes', authMiddleware)

// Rota para aplicar desconto, excluir uma promoção
promocaoRouter
  .route("/products/:id/promotion")
  .post((req, res) => promocaoController.adicionarPromocao(req, res))
  .delete((req, res) => promocaoController.removerPromocao(req, res))
  .put((req, res) => promocaoController.atualizarPromocao(req, res));

// Rota para obter produtos com desconto
promocaoRouter
  .route("/promocoes")
  .get((req, res) => promocaoController.getProdutosComDesconto(req, res));



module.exports = promocaoRouter;