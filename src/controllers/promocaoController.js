const Promocao = require("../models/promocaoModel");
const Pedido = require("../models/pedidoModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

module.exports = {
  aplicarDesconto: async (req, res) => {
    try {
      const clienteCPF = req.headers.cpf;
      const cliente = await User.findOne({ cpf: clienteCPF });

      const pedidos = await Pedido.find({ cliente: cliente._id });

      const resultadoAgregacao = await Pedido.aggregate([
        {
          $match: { cliente: cliente._id },
        },
        {
          $unwind: "$produtos",
        },
        {
          $group: {
            _id: "$produtos.tipo",
            quantidade: { $sum: "$produtos.quantidade" },
          },
        },
        {
          $match: { quantidade: { $gte: 3 } }, // Limite mínimo para criar promoção
        },
      ]);

      const tiposComDesconto = resultadoAgregacao.map((result) => result._id);

      if (tiposComDesconto.length > 0) {
        const promocao = new Promocao({
          cliente: cliente._id,
          produtosComDesconto: tiposComDesconto,
        });
        await promocao.save();
        return res
          .status(201)
          .json({ message: "Promoção aplicada com sucesso." });
      } else {
        return res
          .status(200)
          .json({ message: "Cliente não é elegível para a promoção." });
      }
    } catch (error) {
      console.error("Erro ao aplicar a promoção:", error);
      res.status(500).json({ message: "Erro ao aplicar a promoção." });
    }
  },
  getProdutosComDesconto: async (req, res) => {
    try {
      // Obter o CPF do cliente pelo Header
      const clienteCPF = req.headers.cpf;

      // Encontrar o cliente
      const cliente = await User.findOne({ cpf: clienteCPF });

      // Verificar se o cliente já tem uma promoção
      const promocao = await Promocao.findOne({ cliente: cliente._id });

      if (promocao) {
        // Se o cliente tiver uma promoção ativa, buscar os produtos com desconto
        const produtosComDesconto = await Product.find({
          category: { $in: promocao.produtosComDesconto },
        });

        // Aplicar desconto de 10% nos preços
        produtosComDesconto.forEach((produto) => {
          produto.price = produto.price * 0.9;
        });

        return res.status(200).json(produtosComDesconto);
      } else {
        // Se o cliente não tiver uma promoção ativa, retorne os produtos normais
        const produtos = await Product.find({});
        return res.status(200).json(produtos);
      }
    } catch (error) {
      console.error("Erro ao obter produtos com desconto:", error);
      res.status(500).json({ message: "Erro ao obter produtos com desconto." });
    }
  },
};
