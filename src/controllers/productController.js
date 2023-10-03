// Importando o model
const Produto = require("../models/productModel");

module.exports = {
  // POST de um produto
  createProduct: async (req, res) => {
    try {
      const result = await Produto.create(req.body);
      res
        .status(201)
        .json({ message: `O produto foi cadastrado com sucesso!` });
    } catch (err) {
      res.status(501).json({ message: `Não foi possível cadastrar o produto` });
    }
  },
  // GET de todos os produtos
  getProducts: async (req, res) => {
    try {
      const produtos = await Produto.find({}, "-_v -_id");
      res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      res
        .status(503)
        .json({ mensagem: "Não foi possível recuperar os produtos" });
    }
  },

  //GET de todos os produtos em promoção
  getProductsPromotion: async (req, res) => {
    try {
      const produtosPromo = await Produto.find(
        { emPromocao: true },
        "-_v -_id"
      );
      res.status(200).json(produtosPromo);
    } catch (error) {
      console.error(error);
      res
        .status(503)
        .json({ mensagem: "Não foi possível recuperar os produtos" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const result = await Produto.updateOne({ nome: req.body.nome }, req.body);
      res.status(200).send({ message: "Produto atualizado com sucesso." });
    } catch (err) {
      res
        .status(501)
        .json({ message: "Não foi possível atualizar a lista dos dados" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const result = await Produto.deleteOne({ codigoProduto: req.params.id });
      res.status(200).send({ message: "Produto removido com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: "Não foi possível remover o produto!" });
    }
  },
};
