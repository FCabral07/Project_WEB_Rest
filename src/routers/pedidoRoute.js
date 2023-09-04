const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const pedidoRouter = express.Router();

// Rota para criar um novo pedido
pedidoRouter.route("/cart")
  .post((req, res) => pedidoController.createPedido(req, res));

// Rota para listar todos os pedidos
pedidoRouter.route("/pedidos")
  .get((req, res) => pedidoController.listarPedidos(req, res));

// Rota para excluir todos os pedidos
pedidoRouter.delete("/", (req, res) =>
  pedidoController.excluirTodosPedidos(req, res)
);

module.exports = pedidoRouter;