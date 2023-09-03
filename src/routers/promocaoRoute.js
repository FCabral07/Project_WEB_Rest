"use strict";

const express = require("express");
const promocaoController = require("../controllers/promocaoController");

const promocaoRouter = express.Router();

promocaoRouter
  .route("/promocao/aplicar-desconto")
  .post((req, res) => promocaoController.aplicarDesconto(req, res));

// Rota para listar promoções por CPF do cliente
promocaoRouter
  .route("/promocao/listar")
  .get((req, res) => promocaoController.getProdutosComDesconto(req, res));

module.exports = promocaoRouter;
