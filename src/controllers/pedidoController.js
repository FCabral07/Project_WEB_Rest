const Pedido = require("../models/pedidoModel");
const { User, Employee } = require("../models/userModel");
const Product = require("../models/productModel");

module.exports = {
  createPedido: async (req, res) => {
    try {
      const clienteCPF = req.headers.cpf;
      const { nomeProduto, quantidade } = req.body;

      const cliente = await User.findOne({ cpf: clienteCPF });
      const produto = await Product.findOne({ name: nomeProduto });

      if (!cliente || !produto) {
        return res
          .status(404)
          .json({ message: "Cliente ou produto não encontrado." });
      }

      const pedido = new Pedido({
        cliente: cliente._id,
        produtos: [
          {
            produto: produto._id,
            quantidade: quantidade,
            tipo: produto.category,
          },
        ],
      });

      await pedido.save();

      res.status(201).json({
        message:
          "Pedido criado com sucesso para o cliente de CPF " + clienteCPF,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar o pedido." });
    }
  },

  listarPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate("cliente produtos.produto");
      res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar os pedidos." });
    }
  },

  excluirTodosPedidos: async (req, res) => {
    try {
      await Pedido.deleteMany({});
      res
        .status(200)
        .json({ message: "Todos os pedidos foram excluídos com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir todos os pedidos." });
    }
  },
};