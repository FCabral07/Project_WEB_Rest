const express = require("express");
const promocaoController = require("../controllers/promocaoController");

const promocaoRouter = express.Router();

// Rota para aplicar desconto
promocaoRouter
  .route("/aplicarDesconto")
  .post((req, res) => promocaoController.aplicarDesconto(req, res));

// Rota para obter produtos com desconto
promocaoRouter
  .route("/getProdutosComDesconto")
  .get((req, res) => promocaoController.getProdutosComDesconto(req, res));

module.exports = promocaoRouter;
