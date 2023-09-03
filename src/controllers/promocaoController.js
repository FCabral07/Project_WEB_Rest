const Promocao = require("../models/promocaoModel");
const Pedido = require("../models/pedidoModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

module.exports = {
  // Aplicar desconto para um cliente elegível
  aplicarDesconto: async (req, res) => {
    try {
      // Obtenha o CPF do cliente do cabeçalho
      const clienteCPF = req.headers.cpf;

      // Encontre o cliente
      const cliente = await User.findOne({ cpf: clienteCPF });

      // Verifique se o cliente já possui uma promoção ativa
      const promocaoExistente = await Promocao.findOne({
        cliente: cliente._id,
      });

      if (promocaoExistente) {
        return res
          .status(400)
          .json({ message: "O cliente já possui uma promoção ativa." });
      }

      // Obtenha os pedidos do cliente
      const pedidos = await Pedido.find({ cliente: cliente._id });

      // Conte a quantidade de cada tipo de produto comprado
      const tiposComprados = {};

      for (const pedido of pedidos) {
        for (const item of pedido.produtos) {
          if (!tiposComprados[item.tipo]) {
            tiposComprados[item.tipo] = item.quantidade;
          } else {
            tiposComprados[item.tipo] += item.quantidade;
          }
        }
      }

      // Verifique se algum tipo atingiu a quantidade mínima para a promoção (por exemplo, 3)
      const tiposComDesconto = [];

      for (const tipo in tiposComprados) {
        if (tiposComprados[tipo] >= 3) {
          tiposComDesconto.push(tipo);
        }
      }

      // Se o cliente é elegível, crie uma promoção para ele
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

  // Obter produtos com desconto (se cliente tiver promoção ativa)
  getProdutosComDesconto: async (req, res) => {
    try {
      // Obtenha o CPF do cliente do cabeçalho
      const clienteCPF = req.headers.cpf;

      // Encontre o cliente
      const cliente = await User.findOne({ cpf: clienteCPF });

      // Verifique se o cliente possui uma promoção ativa
      const promocao = await Promocao.findOne({ cliente: cliente._id });

      if (promocao) {
        // Se o cliente tiver uma promoção ativa, busque os produtos com desconto
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
