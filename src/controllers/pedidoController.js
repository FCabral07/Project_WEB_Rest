const Pedido = require("../models/pedidoModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

module.exports = {
  createPedido: async (req, res) => {
    try {
      // Obtenha o CPF do cliente do cabeçalho
      const clienteCPF = req.headers.cpf;
      const { nomeProduto, quantidade } = req.body;

      // Encontre o usuário com base no CPF
      const cliente = await User.findOne({ cpf: clienteCPF });

      // Encontre o produto com base no nome
      const produto = await Product.findOne({ name: nomeProduto });

      if (!cliente || !produto) {
        return res
          .status(404)
          .json({ message: "Cliente ou produto não encontrado." });
      }

      // Crie o pedido
      const pedido = new Pedido({
        cliente: cliente._id,
        produtos: [
          {
            produto: produto._id,
            quantidade,
            tipo: produto.category,
          },
        ],
      });

      // Salve o pedido
      await pedido.save();

      res.status(201).json({ message: "Pedido criado com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar o pedido." });
    }
  },

  // Listar todos os pedidos
  listarPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate("cliente produtos.produto");
      res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar os pedidos." });
    }
  },
};
