const express = require("express");
const pedidoController = require("../controllers/pedidoController");
const authMiddleware = require("../authMiddleware");
const roleMiddleware = require("../roleMiddleware");

const pedidoRouter = express.Router();

pedidoRouter.use("/deletar", authMiddleware, roleMiddleware);

// Rota para criar um novo pedido
pedidoRouter.route("/cart")
  .post((req, res) => pedidoController.createPedido(req, res));

// Rota para listar todos os pedidos
pedidoRouter.route("/pedidos")
  .get((req, res) => pedidoController.listarPedidos(req, res));

// Rota para excluir todos os pedidos
pedidoRouter.delete("/deletar", (req, res) =>
  pedidoController.excluirTodosPedidos(req, res)
);

module.exports = pedidoRouter;